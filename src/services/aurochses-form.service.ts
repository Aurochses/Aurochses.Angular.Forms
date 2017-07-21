import { Injectable } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { AurochsesValidators } from './validators';

import {
    CompareMetadata,
    MaxLengthMetadata,
    MaxMetadata,
    MinLengthMetadata,
    MinMetadata,
    PatternMetadata,
    RangeMetadata,
    RequiredMetadata
} from '../decorators/validate/metadata';

import { DisabledMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata';

import { Display } from '../decorators/display/models/display.model';

import { CustomErrorModel } from '../models/custom-error.model';
import { CustomFormControl } from './custom-form-control';
import { CustomFormGroup } from './custom-form-group';
import { InputType } from './input.type';

@Injectable()
export class AurochsesFormService {

    constructor(private formBuilder: FormBuilder) { }

    public build<T>(type: new () => T): FormGroup | null {
        let modelInstance = new type();

        if (modelInstance) {
            return this.iterate(modelInstance);
        }

        return null;
    }

    private iterate<T>(instance: T) {

        const formGroup: FormGroup = new FormGroup({});
        for (let property in instance) {
            if (instance.hasOwnProperty(property)) {

                let inputType = this.getType(instance, property);
                let display = this.getDisplay(instance, property);

                if (inputType === InputType.object) {
                    formGroup.addControl(property.toString(), new CustomFormGroup(
                        this.formBuilder.group(this.iterate(instance[property])).controls, inputType, display
                    ));
                } else {
                    let validators = new Array<ValidatorFn>();
                    let errorMessages = new Array<CustomErrorModel>();


                    let readonly = this.isReadonly(instance, property);
                    let disabled = this.isDisabled(instance, property);
                    let required = this.isRequired(instance, property, errorMessages, validators);
                    let maxLength = this.getMaxLength(instance, property, errorMessages, validators);
                    let minLength = this.getMinLength(instance, property, errorMessages, validators);
                    let max = this.getMax(instance, property, errorMessages, validators);
                    let min = this.getMin(instance, property, errorMessages, validators);
                    let pattern = this.getPattern(instance, property, errorMessages, validators);
                    let compare = this.getCompare(instance, property, errorMessages, validators, formGroup);

                    formGroup.addControl(property.toString(), new CustomFormControl(
                        property,
                        inputType,
                        display,
                        readonly,
                        required,
                        disabled,
                        maxLength,
                        minLength,
                        max,
                        min,
                        pattern,
                        compare,
                        validators,
                        errorMessages
                    ));
                }
            }
        }

        return formGroup;
    }

    private getDisplay<T>(instance: T, name: string): Display {
        let prototype = Object.getPrototypeOf(instance);

        let display = new Display();

        if (`${DisplayMetadata.displayName}${name}` in prototype) {
            display.name = prototype[`${DisplayMetadata.displayName}${name}`];
        }
        if (`${DisplayMetadata.displayDesc}${name}` in prototype) {
            display.description = prototype[`${DisplayMetadata.displayDesc}${name}`];
        }
        if (`${DisplayMetadata.displayOrder}${name}` in prototype) {
            display.order = prototype[`${DisplayMetadata.displayOrder}${name}`];
        }

        return display;
    }

    private getType<T>(instance: T, name: keyof T): InputType {
        let prototype = Object.getPrototypeOf(instance);

        if (`${HiddenMetadata.isHidden}${name}` in prototype && prototype[`${HiddenMetadata.isHidden}${name}`] === true) {
            return InputType.hidden;
        }

        if (typeof instance[name] === 'string') {
            return InputType.text;
        }

        if (typeof instance[name] === 'boolean') {
            return InputType.boolean;
        }

        if (typeof instance[name] === 'number') {
            return InputType.number;
        }

        if (instance[name] instanceof Date) {
            return InputType.date;
        }

        if (typeof instance[name] === 'object') {
            return InputType.object;
        }

        return InputType.default;
    }

    private isReadonly<T>(instance: T, name: string): boolean {
        let prototype = Object.getPrototypeOf(instance);

        return !!prototype[`${ReadonlyMetadata.isReadonly}${name}`];
    }

    private isDisabled<T>(instance: T, name: string): boolean {
        let prototype = Object.getPrototypeOf(instance);

        return !!prototype[`${DisabledMetadata.isDisabled}${name}`];
    }

    private isRequired<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): boolean {
        let prototype = Object.getPrototypeOf(instance);

        if (`${RequiredMetadata.isRequired}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('required', prototype[`${RequiredMetadata.errRequired}${name}`])
            );
            validators.push(Validators.required);

            return true;
        }

        return false;
    }

    private getMaxLength<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): number | null {

        let prototype = Object.getPrototypeOf(instance);
        let maxLength = null;

        if (`${MaxLengthMetadata.hasMaxLength}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('maxlength', prototype[`${MaxLengthMetadata.errMaxLength}${name}`])
            );

            maxLength = parseInt(prototype[`${MaxLengthMetadata.hasMaxLength}${name}`], 10);
            validators.push(Validators.maxLength(maxLength));
        }

        return maxLength;
    }

    private getMinLength<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): number | null {

        let prototype = Object.getPrototypeOf(instance);
        let minLength = null;

        if (`${MinLengthMetadata.hasMinLength}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('minlength', prototype[`${MinLengthMetadata.errMinLength}${name}`])
            );

            minLength = parseInt(prototype[`${MinLengthMetadata.hasMinLength}${name}`], 10);
            validators.push(Validators.minLength(minLength));
        }

        return minLength;
    }

    private getMax<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): number | null {

        let prototype = Object.getPrototypeOf(instance);

        if (`${MaxMetadata.hasMax}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('max', prototype[`${MaxMetadata.errMax}${name}`])
            );
            let max: number | Date = Number(prototype[`${MaxMetadata.hasMax}${name}`]);
            if (!max) {
                max = Date.parse(max.toString());
            }

            validators.push(AurochsesValidators.max(max));

            return max;
        }

        return null;
    }

    private getMin<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): number | null {

        let prototype = Object.getPrototypeOf(instance);

        if (`${MinMetadata.hasMin}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('min', prototype[`${MinMetadata.errMin}${name}`])
            );
            let min: number | Date = Number(prototype[`${MinMetadata.hasMin}${name}`]);
            if (!min) {
                min = Date.parse(min.toString());
            }

            validators.push(AurochsesValidators.min(min));

            return min;
        }

        return null;
    }

    private getPattern<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>
    ): boolean {

        let prototype = Object.getPrototypeOf(instance);

        if (`${PatternMetadata.hasPattern}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('pattern', prototype[`${PatternMetadata.errPattern}${name}`])
            );

            validators.push(Validators.pattern(new RegExp(prototype[`${PatternMetadata.hasPattern}${name}`])));

            return true;
        }

        return false;
    }

    private getCompare<T>(
        instance: T,
        name: string,
        errorMessages: Array<CustomErrorModel>,
        validators: Array<ValidatorFn>,
        formGroup: FormGroup
    ): boolean {

        let prototype = Object.getPrototypeOf(instance);

        if (`${CompareMetadata.hasCompareProperty}${name}` in prototype) {
            errorMessages.push(
                new CustomErrorModel('compare', prototype[`${CompareMetadata.errCompareProperty}${name}`])
            );

            validators.push(AurochsesValidators.compare(prototype[`${CompareMetadata.withCompare}${name}`], formGroup));

            return true;
        }

        return false;
    }
}
