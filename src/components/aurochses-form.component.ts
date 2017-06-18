import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayGroupMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-form',
    template: `<ng-container *ngFor="let control of controls" [ngSwitch]="getType(control.name)">
                    <hidden *ngSwitchCase="'hidden'" [formGroup]="formGroup" [control]="control"></hidden>
                    <date *ngSwitchCase="'date'" [formGroup]="formGroup" [control]="control"></date>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    controls: Array<{ key: number, name: string, type: string, isReadonly: boolean, placeholder: string }>;

    editorModel: any;

    constructor() {
        this.controls = new Array<{ key: number, name: string, type: string, isReadonly: boolean, placeholder: string }>();
    }

    ngOnInit() {
        this.editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

        for (let name in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(name)) {
                if (this.editorModel) {
                    this.controls.push({
                        key: this.editorModel[`${DisplayMetadata.displayOrder}${name}`],
                        name: name,
                        type: this.getType(name),
                        isReadonly: this.isReadonly(name),
                        placeholder: this.editorModel[`${DisplayMetadata.displayName}${name}`]
                    });
                }
            }
        }

        this.controls.sort((e, n) => e.key - n.key);
    }

    getType(name: string): string {

        if (this.editorModel[`${HiddenMetadata.isHidden}${name}`] === true) {
           return 'hidden';
        }

        if (typeof this.editorModel[name] === 'string') {
            return 'text';
        }

        if (typeof this.editorModel[name] === 'boolean') {
            return 'boolean';
        }

        if (typeof this.editorModel[name] === 'number') {
            return 'number';
        }

        if (this.editorModel[name] instanceof Date) {
            return 'date';
        }

        return '';
    }

    isReadonly(name: string): boolean {
        return !!this.editorModel[`${ReadonlyMetadata.isReadonly}${name}`];
    }
}
