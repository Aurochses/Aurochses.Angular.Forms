import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

import { Display } from '../decorators/display/models/display.model';
import { CustomErrorModel } from '../models/custom-error.model';

export class CustomFormControl extends FormControl {

    type: string;
    display: Display;
    isReadonly: boolean;
    isRequired: boolean;
    errorMessages: Array<CustomErrorModel>;

    constructor(
        type: string,
        display: Display,
        validator?: ValidatorFn | ValidatorFn[] | null,
        isReadonly: boolean = false,
        isRequired: boolean = false,
        errorMessages:  Array<CustomErrorModel> = new Array<CustomErrorModel>()
    ) {
        super('', validator);

        this.type = type;
        this.display = display;
        this.isReadonly = isReadonly;
        this.isRequired = isRequired;
        this.errorMessages = errorMessages;
    }
}
