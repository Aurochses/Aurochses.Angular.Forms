import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'boolean',
    template: `<div [formGroup]="formGroup">
                <md-checkbox [formControlName]="control.name">{{ control.placeholder }}</md-checkbox>
               </div>`
})
export class BooleanComponent {

    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;
}
