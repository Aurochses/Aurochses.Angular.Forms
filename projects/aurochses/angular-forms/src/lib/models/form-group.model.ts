import { AbstractControl, FormGroup } from '@angular/forms';

import { InputType } from './input.type';
import { DisplayModel } from './display.model';

export class AurFormGroup extends FormGroup {

    inputType: InputType;
    key: number;
    placeholder: string;

    constructor(ctrls: { [key: string]: AbstractControl }, inputType: InputType, displayModel: DisplayModel) {
        super(ctrls);

        this.inputType = inputType;
        this.key = displayModel.order;
        this.placeholder = displayModel.name;
    }
}
