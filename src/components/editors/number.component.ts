import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'number',
    template: `<md-input-container [formGroup]="formGroup">
                <input mdInput
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    type="number" />
               </md-input-container>`
})
export class NumberComponent {

    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;
}
