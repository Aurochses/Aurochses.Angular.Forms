import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayGroupMetadata, DisplayMetadata } from '../decorators/display/metadata';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-form',
    template: `<ng-container *ngFor="let editor of editors" [ngSwitch]="getType(editor.editor)">
                    <date *ngSwitchCase="date" [formGroup]="formGroup" [name]="editor.editor"></date>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    editors: Array<{ key: number, editor: string }>;
    constructor() {
        this.editors = new Array<{ key: number, editor: string }>();
    }

    ngOnInit() {
        for (let controlName in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(controlName)) {
                let editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

                if (editorModel) {
                    this.editors.push({
                        key: editorModel[`${DisplayMetadata.displayOrder}${controlName}`],
                        editor: controlName
                    });
                }
            }
        }

        this.editors.sort((e, n) => e.key - n.key);
    }

    getType(name: string) {
        let editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

        if (typeof editorModel[name] === 'string') {
            return 'text';
        }

        if (typeof editorModel[name] === 'boolean') {
            return 'boolean';
        }

        if (typeof editorModel[name] === 'number') {
            return 'number';
        }

        if (editorModel[name] instanceof Date) {
            return 'date';
        }
    }
}
