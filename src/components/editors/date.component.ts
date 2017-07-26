import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'date',
    template: `
                <md-input-container [formGroup]="formGroup">
                    <input mdInput
                    [mdDatepicker]="datepicker"
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    [max]="control.max"
                    [min]="control.min" />
                    <button *ngIf="!control.isReadonly" mdSuffix [mdDatepickerToggle]="datepicker"></button>
                    <md-error>{{ message() }}</md-error>
                </md-input-container>
                <md-datepicker #datepicker></md-datepicker>`
})
export class DateComponent {

    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;

    message(): string {
        return (<CustomFormControl>this.formGroup.controls[this.control.name]).errorMessages
            .filter((error: CustomErrorModel) => this.formGroup.controls[this.control.name].hasError(error.type))
            .map((error: CustomErrorModel) => error.message)[0];
    }
}
