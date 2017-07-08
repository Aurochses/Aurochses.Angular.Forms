import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

import { Display } from '../decorators/display/models/display.model';
import { CustomErrorModel } from '../models/custom-error.model';

export class CustomFormControl extends FormControl {

    type: string;
    display: Display;
    isReadonly: boolean;
    isRequired: boolean;
    maxLength?: number | null;
    minLength?: number | null;
    max?: number | Date | null;
    min?: number | Date | null;
    pattern: boolean;
    compare: boolean;
    errorMessages: Array<CustomErrorModel>;

    constructor(
        type: string,
        display: Display,
        isReadonly: boolean = false,
        isRequired: boolean = false,
        isDisabled: boolean = false,
        maxLength?: number | null,
        minLength?: number | null,
        max?: number | Date | null,
        min?: number | Date | null,
        pattern: boolean = false,
        compare: boolean = false,
        validator?: ValidatorFn | ValidatorFn[] | null,
        errorMessages: Array<CustomErrorModel> = new Array<CustomErrorModel>()
    ) {
        super({ value: '', disabled: isDisabled }, validator);

        this.type = type;
        this.display = display;
        this.isReadonly = isReadonly;
        this.isRequired = isRequired;
        this.maxLength = maxLength;
        this.minLength = minLength;
        this.max = max;
        this.min = min;
        this.pattern = pattern;
        this.compare = compare;
        this.errorMessages = errorMessages;
    }
}
