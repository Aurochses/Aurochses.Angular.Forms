import { AbstractControl, FormGroup } from '@angular/forms';

import { InputType } from './input.type';
import { DisplayGroupModel } from './display-group.model';

export class AurFormGroup extends FormGroup {

    inputType: InputType;
    key: number;
    placeholder: string;

    constructor(
        controls: { [key: string]: AbstractControl },

        inputType: InputType,

        index: number,
        displayGroupModel: DisplayGroupModel
    ) {
        super(controls);

        this.inputType = inputType;

        this.key = displayGroupModel.order ? displayGroupModel.order : index;
        this.placeholder = displayGroupModel.name;
    }
}
