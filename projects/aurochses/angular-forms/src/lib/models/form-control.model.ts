import { FormControl, ValidatorFn } from '@angular/forms';

import { InputType } from './input.type';
import { DisplayModel } from './display.model';
import { ErrorMessageModel } from './error-message.model';

export class AurFormControl extends FormControl {

    inputType: InputType;

    key: number;
    name: string;
    placeholder: string;

    prefix: string;
    suffix: string;

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
        defaultValue: any | undefined,

        inputType: InputType,

        index: number,
        displayModel: DisplayModel,

        isDisabled: boolean = false,
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
        super(
            {
                value: defaultValue ? defaultValue : '',
                disabled: isDisabled
            },
            validator
        );

        this.inputType = inputType;

        this.key = displayModel.order ? displayModel.order : index;
        this.name = property;
        this.placeholder = displayModel.name;

        this.prefix = displayModel.prefix;
        this.suffix = displayModel.suffix;

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
