import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { Compare, Max, Min } from './validators';

import { AurFormControl } from '../models/form-control.model';
import { AurFormGroup } from '../models/form-group.model';
import { ErrorMessageModel } from '../models/error-message.model';

import { InputType, getInputType } from '../models/input.type';
import { HintType } from '../models/hint.type';

import { getDisplayModel } from '../decorators/display.decorator';
import { isDisabled } from '../decorators/disabled.decorator';
import { getHintModel } from '../decorators/hint.decorator';
import { isPassword } from '../decorators/password.decorator';
import { isReadonly } from '../decorators/readonly.decorator';

import { hasCompare, getCompareModel } from '../decorators/validation/compare.decorator';
import { hasMaxLength, getMaxLengthModel } from '../decorators/validation/max-length.decorator';
import { hasMax, getMaxModel } from '../decorators/validation/max.decorator';
import { hasMinLength, getMinLengthModel } from '../decorators/validation/min-length.decorator';
import { hasMin, getMinModel } from '../decorators/validation/min.decorator';
import { hasPattern, getPatternModel } from '../decorators/validation/pattern.decorator';
import { isRequired, getRequiredModel } from '../decorators/validation/required.decorator';

@Injectable()
export class AurFormService {

    constructor(private formBuilder: FormBuilder) { }

    public build<T>(instance: T): FormGroup | null {
        if (instance) {
            return this.iterate(instance);
        }

        return null;
    }

    private iterate<T>(instance: T) {
        const formGroup: FormGroup = new FormGroup({});

        for (const property in instance) {
            if (instance.hasOwnProperty(property)) {
                const inputType = getInputType(instance, property);
                const displayModel = getDisplayModel(instance, property);

                if (inputType === InputType.object) {
                    formGroup.addControl(
                        property.toString(),
                        new AurFormGroup(
                            this.formBuilder.group(this.iterate(instance[property])).controls,
                            inputType,
                            displayModel
                        )
                    );
                } else {
                    const validators = new Array<ValidatorFn>();
                    const errorMessages = new Array<ErrorMessageModel>();

                    const disabled = isDisabled(instance, property);
                    const hint: { type: HintType, params: Array<{ key: string, value: string }> } | null = getHintModel(instance, property);
                    const password = isPassword(instance, property);
                    const readonly = isReadonly(instance, property);

                    const compare = hasCompare(instance, property);
                    if (compare) {
                        const compareModel = getCompareModel(instance, property);

                        validators.push(Compare(compareModel.withProperty, formGroup));
                        errorMessages.push(new ErrorMessageModel('compare', compareModel.errorMessage));
                    }

                    let maxLength: number | null = null;
                    if (hasMaxLength(instance, property)) {
                        const maxLengthModel = getMaxLengthModel(instance, property);

                        maxLength = maxLengthModel.maxLength;
                        validators.push(Validators.maxLength(maxLength));
                        errorMessages.push(new ErrorMessageModel('maxlength', maxLengthModel.errorMessage));
                    }

                    let max: number | Date | null = null;
                    if (hasMax(instance, property)) {
                        const maxModel = getMaxModel(instance, property);

                        max = maxModel.max;
                        validators.push(Max(max));
                        errorMessages.push(new ErrorMessageModel('max', maxModel.errorMessage));
                    }

                    let minLength: number | null = null;
                    if (hasMinLength(instance, property)) {
                        const minLengthModel = getMinLengthModel(instance, property);

                        minLength = minLengthModel.minLength;
                        validators.push(Validators.minLength(minLength));
                        errorMessages.push(new ErrorMessageModel('minlength', minLengthModel.errorMessage));
                    }

                    let min: number | Date | null = null;
                    if (hasMin(instance, property)) {
                        const minModel = getMinModel(instance, property);

                        min = minModel.min;
                        validators.push(Min(min));
                        errorMessages.push(new ErrorMessageModel('min', minModel.errorMessage));
                    }

                    const pattern = hasPattern(instance, property);
                    if (pattern) {
                        const patternModel = getPatternModel(instance, property);

                        validators.push(Validators.pattern(patternModel.pattern));
                        errorMessages.push(new ErrorMessageModel('pattern', patternModel.errorMessage));
                    }

                    // todo: v.rodchenko: range decorator???

                    const required = isRequired(instance, property);
                    if (required) {
                        const requiredModel = getRequiredModel(instance, property);

                        validators.push(Validators.required);
                        errorMessages.push(new ErrorMessageModel('required', requiredModel.errorMessage));
                    }

                    // todo: v.rodchenko: string-length decorator???

                    formGroup.addControl(
                        property.toString(),
                        new AurFormControl(
                            property,

                            inputType,

                            displayModel,

                            disabled,
                            hint,
                            password,
                            readonly,

                            compare,
                            maxLength,
                            max,
                            minLength,
                            min,
                            pattern,
                            required,

                            validators,
                            errorMessages
                        )
                    );
                }
            }
        }

        return formGroup;
    }
}
