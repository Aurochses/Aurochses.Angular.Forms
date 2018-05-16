import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';

@Component({
    selector: 'aur-boolean',
    templateUrl: './boolean.component.html'
})
export class BooleanComponent {

    @Input()
    formGroup: FormGroup;

    @Input()
    control: AurFormControl;
}
