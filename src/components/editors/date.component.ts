import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'date',
    template: `
                <md-input-container [formGroup]="formGroup">
                    <input mdInput [mdDatepicker]="datepicker" [formControlName]="control.name" [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder">
                    <button *ngIf="!control.isReadonly" mdSuffix [mdDatepickerToggle]="datepicker"></button>
                </md-input-container>
                <md-datepicker #datepicker></md-datepicker>`
})
export class DateComponent {

    @Input()
    control: Array<{ key: number, name: string, type: string, isReadonly: boolean, placeholder: string }>;

    @Input()
    formGroup: FormGroup;
}
