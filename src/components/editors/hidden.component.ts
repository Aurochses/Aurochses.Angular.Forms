import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'hidden',
    template: `<div [formGroup]="formGroup">
                <input [formControlName]="control.name" type="hidden" />
               </div>`
})
export class HiddenComponent {

    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;
}
