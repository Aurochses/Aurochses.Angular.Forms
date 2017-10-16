import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'text',
    template: ` <md-input-container [formGroup]="formGroup">
                    <textarea mdInput
                    mdTextareaAutosize
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    [maxlength]="control.maxLength"
                    [minlength]="control.minLength"></textarea>
                    <md-hint *ngIf="control.maxLength" align="end">
                        {{ formGroup.controls[control.name].value.length }} / {{ control.maxLength }}
                    </md-hint>
                    <md-error>
                        {{ message() }}
                    </md-error>
                </md-input-container>`
})

export class TextComponent {
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
