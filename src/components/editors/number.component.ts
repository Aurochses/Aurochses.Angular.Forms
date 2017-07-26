import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'number',
    template: `<md-input-container [formGroup]="formGroup">
                <input mdInput
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    [max]="control.max"
                    [min]="control.min"
                    type="number" />
                    <md-error>
                        {{ message() }}
                    </md-error>
               </md-input-container>`
})
export class NumberComponent {

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
