import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';

@Component({
    selector: 'aur-hidden',
    templateUrl: './hidden.component.html'
})
export class HiddenComponent {

    @Input() formGroup: FormGroup;
    @Input() control: AurFormControl;
}
