import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlModel } from '../../models/control.model';
import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'text',
    template: `<md-input-container [formGroup]="formGroup">
                    <input mdInput
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    [maxlength]="control.maxLength"
                    [minlength]="control.minLength"
                    [max]="control.max"
                    [min]="control.min">
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
    control: ControlModel;

    @Input()
    formGroup: FormGroup;

    message(): string {
        return (<CustomFormControl>this.formGroup.controls[this.control.name]).errorMessages
            .filter((error: CustomErrorModel) => this.formGroup.controls[this.control.name].hasError(error.type))
            .map((error: CustomErrorModel) => error.message)[0];
    }
}
