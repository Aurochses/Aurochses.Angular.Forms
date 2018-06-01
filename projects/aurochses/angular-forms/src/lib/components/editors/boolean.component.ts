import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';

@Component({
    selector: 'aur-boolean',
    templateUrl: './boolean.component.html'
})
export class BooleanComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() control: AurFormControl;

    ngOnInit(): void {
        if (this.control.value === '') {
            this.control.setValue(false);
        }
    }
}
