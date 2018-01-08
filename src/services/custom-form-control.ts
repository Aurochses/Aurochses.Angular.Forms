import { FormControl, ValidatorFn } from '@angular/forms';

import { Display } from '../decorators/display/models/display.model';
import { HintType } from '../decorators/display/models/hint.type';
import { CustomErrorModel } from '../models/custom-error.model';
import { InputType } from './input.type';

export class CustomFormControl extends FormControl {

    type: InputType;
    key: number;
    name: string;
    placeholder: string;
    isReadonly: boolean;
    isRequired: boolean;
    maxLength?: number | null;
    minLength?: number | null;
    max?: number | Date | null;
    min?: number | Date | null;
    pattern: boolean;
    compare: boolean;
    hint?: { params: Array<{ key: string, value: string }>, type: HintType } | null;
    errorMessages: Array<CustomErrorModel>;

    constructor(
        property: string,
        type: InputType,
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
        hint?: { params: Array<{ key: string, value: string }>, type: HintType } | null,
        validator?: ValidatorFn | ValidatorFn[] | null,
        errorMessages: Array<CustomErrorModel> = new Array<CustomErrorModel>()
    ) {
        super({ value: '', disabled: isDisabled }, validator);

        this.type = type;
        this.key = display.order;
        this.name = property;
        this.placeholder = display.name;
        this.isReadonly = isReadonly;
        this.isRequired = isRequired;
        this.maxLength = maxLength;
        this.minLength = minLength;
        this.max = max;
        this.min = min;
        this.pattern = pattern;
        this.compare = compare;
        this.hint = hint;
        this.errorMessages = errorMessages;
    }
}
