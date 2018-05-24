import { FormControl, ValidatorFn } from '@angular/forms';

import { InputType } from './input.type';
import { HintType } from './hint.type';
import { DisplayModel } from './display.model';
import { ErrorMessageModel } from './error-message.model';

export class AurFormControl extends FormControl {

    inputType: InputType;

    key: number;
    name: string;
    placeholder: string;

    hint?: { type: HintType, params: Array<{ key: string, value: string }> } | null;
    isPassword: boolean;
    isReadonly: boolean;

    hasCompare: boolean;
    maxLength?: number | null;
    max?: number | Date | null;
    minLength?: number | null;
    min?: number | Date | null;
    hasPattern: boolean;
    isRequired: boolean;

    errorMessages: Array<ErrorMessageModel>;

    constructor(
        property: string,

        inputType: InputType,

        displayModel: DisplayModel,

        isDisabled: boolean = false,
        hint?: { type: HintType, params: Array<{ key: string, value: string }> } | null,
        password: boolean = false,
        isReadonly: boolean = false,

        hasCompare: boolean = false,
        maxLength?: number | null,
        max?: number | Date | null,
        minLength?: number | null,
        min?: number | Date | null,
        hasPattern: boolean = false,
        isRequired: boolean = false,

        validator?: ValidatorFn | ValidatorFn[] | null,
        errorMessages: Array<ErrorMessageModel> = new Array<ErrorMessageModel>()
    ) {
        super({ value: '', disabled: isDisabled }, validator);

        this.inputType = inputType;

        this.key = displayModel.order;
        this.name = property;
        this.placeholder = displayModel.name;

        this.hint = hint;
        this.isPassword = password;
        this.isReadonly = isReadonly;

        this.hasCompare = hasCompare;
        this.maxLength = maxLength;
        this.max = max;
        this.minLength = minLength;
        this.min = min;
        this.hasPattern = hasPattern;
        this.isRequired = isRequired;

        this.errorMessages = errorMessages;
    }
}
