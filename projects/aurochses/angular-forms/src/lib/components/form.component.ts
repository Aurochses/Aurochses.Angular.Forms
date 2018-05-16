import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../models/form-control.model';
import { AurFormGroup } from '../models/form-group.model';
import { InputType } from '../models/input.type';
import { HintType } from '../models/hint.type';

@Component({
    selector: 'aur-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    @Input()
    component?: Object;

    controls: Array<AurFormControl | AurFormGroup>;

    inputType = InputType;
    hintType = HintType;

    constructor() {
        this.controls = new Array<AurFormControl | AurFormGroup>();
    }

    ngOnInit() {
        for (const control in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(control)) {
                this.controls.push(<AurFormControl | AurFormGroup>this.formGroup.controls[control]);
            }
        }

        this.controls.sort((e, n) => e.key - n.key);
    }
}
