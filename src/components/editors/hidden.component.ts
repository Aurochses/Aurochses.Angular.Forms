import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlModel } from '../../models/control.model';

@Component({
    selector: 'hidden',
    template: `<div [formGroup]="formGroup">
                <input [formControlName]="control.name" type="hidden" />
               </div>`
})
export class HiddenComponent {

    @Input()
    control: Array<ControlModel>;

    @Input()
    formGroup: FormGroup;
}
