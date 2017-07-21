import { AbstractControl, FormGroup } from '@angular/forms';

import { Display } from '../decorators/display/models/display.model';
import { InputType } from './input.type';

export class CustomFormGroup extends FormGroup {

    type: InputType;
    key: number;
    placeholder: string;

    constructor(ctrls: { [key: string]: AbstractControl }, inputType: InputType, display: Display) {
        super(ctrls);

        this.type = inputType;
        this.key = display.order;
        this.placeholder = display.name;
    }
}
