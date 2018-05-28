import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../models/form-control.model';
import { AurFormGroup } from '../models/form-group.model';
import { InputType } from '../models/input.type';

@Component({
    selector: 'aur-form-group',
    templateUrl: './form-group.component.html'
})
export class FormGroupComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() component: Object;

    controls = new Array<AurFormControl | AurFormGroup>();

    inputType = InputType;

    constructor() { }

    ngOnInit() {
        for (const control in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(control)) {
                this.controls.push(<AurFormControl | AurFormGroup>this.formGroup.controls[control]);
            }
        }

        this.controls = this.controls.sort((e, n) => e.key - n.key);
    }
}
