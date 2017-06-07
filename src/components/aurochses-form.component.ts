import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayGroupMetadata, DisplayMetadata, ReadonlyMetadata } from '../decorators/display/metadata';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-form',
    template: `<ng-container *ngFor="let control of controls" [ngSwitch]="getType(control.name)">
                    <date *ngSwitchCase="'date'" [formGroup]="formGroup" [control]="control"></date>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    controls: Array<{ key: number, name: string, type: string, isReadonly: boolean }>;

    editorModel: any;

    constructor() {
        this.controls = new Array<{ key: number, name: string, type: string, isReadonly: boolean }>();
    }

    ngOnInit() {
        this.editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

        for (let name in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(name)) {
                let editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

                if (editorModel) {
                    this.controls.push({
                        key: editorModel[`${DisplayMetadata.displayOrder}${name}`],
                        name: name,
                        type: this.getType(name),
                        isReadonly: this.isReadonly(name)
                    });
                }
            }
        }



        this.controls.sort((e, n) => e.key - n.key);
    }

    getType(name: string): string {

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
