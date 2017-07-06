import { Injectable } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

// import { CustomError } from '../models/custom-error';

import {
    CompareMetadata,
    MaxLengthMetadata,
    MinLengthMetadata,
    PatternMetadata,
    RangeMetadata,
    RequiredMetadata
} from '../decorators/validate/metadata';

import { DisabledMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata';

import { Display } from '../decorators/display/models/display.model';

import { CustomErrorModel } from '../models/custom-error.model';
import { CustomFormControl } from './custom-form-control';

// function validateCompare(p: string) {
//     let changeEventWasAdded: boolean = false;
//     return function (formControl: FormControl) {
//         let form: FormGroup = formControl.root as FormGroup;
//         if (form && form.controls && !changeEventWasAdded) {
//             form.controls[p].valueChanges.subscribe(() => {
//                 formControl.updateValueAndValidity();
//             });
//             changeEventWasAdded = true;
//         }
//         if (formControl.value) {
//             return (!formControl.value || formControl.value === (<any>formControl.root)[`controls`][p].value) ? null : {
//                 'compare': {
//                     valid: false
//                 }
//             };
//         }
//     };
// }

// function validateRange(from: number | Date, to: number | Date) {

//     return function (formControl: FormControl) {
//         if ((Number(from) || Number(to)) && Number(formControl.value)) {
//             from = Number(from);
//             to = Number(to);
//             let value = Number(formControl.value);
//             return (!from || value >= from) && (!to || value <= to) ? null : {
//                 'range': {
//                     valid: false
//                 }
//             };
//         }
//         if ((Date.parse(from.toString()) || Date.parse(to.toString())) && Date.parse(formControl.value)) {
//             from = Date.parse(from.toString());
//             to = Date.parse(to.toString());
//             let value = Date.parse(formControl.value);
//             return (!from || value >= from) && (!to || value <= to) ? null : {
//                 'range': {
//                     valid: false
//                 }
//             };
//         }
//     };
// }


@Injectable()
export class AurochsesFormService {

    constructor(private formBuilder: FormBuilder) { }

    public build<T>(type: new () => T): FormGroup | null {

        let form: FormGroup;
        let modelInstance = new type();

        if (modelInstance) {
            let map: { [key: string]: FormControl; } = {};

            for (let propName in modelInstance) {
                if (propName) {
                    let validators = new Array<ValidatorFn>();
                    let errorMessages = new Array<CustomErrorModel>();
                    let prototype = Object.getPrototypeOf(modelInstance);

                    // if (`${CompareMetadata.hasCompareProperty}${propName}` in prototype) {
                    //     errorMessages.push(
                    //         new CustomErrorModel('compare', prototype[`${CompareMetadata.errCompareProperty}${propName}`])
                    //     );
                    //     validators.push(validateCompare(prototype[`${CompareMetadata.withCompare}${propName}`]));
                    // }

                    if (`${MaxLengthMetadata.hasMaxLength}${propName}` in prototype) {
                        errorMessages.push(
                            new CustomErrorModel('maxlength', prototype[`${MaxLengthMetadata.errMaxLength}${propName}`])
                            );
                        let maxLength = parseInt(prototype[`${MaxLengthMetadata.hasMaxLength}${propName}`], 10);
                        validators.push(Validators.maxLength(maxLength));
                    }

                    if (`${MinLengthMetadata.hasMinLength}${propName}` in prototype) {
                        errorMessages.push(
                            new CustomErrorModel('minlength', prototype[`${MinLengthMetadata.errMinLength}${propName}`])
                        );
                        let minLength = parseInt(prototype[`${MinLengthMetadata.hasMinLength}${propName}`], 10);
                        validators.push(Validators.minLength(minLength));
                    }

                    if (`${PatternMetadata.hasPattern}${propName}` in prototype) {
                        errorMessages.push(
                            new CustomErrorModel('pattern', prototype[`${PatternMetadata.errPattern}${propName}`])
                        );
                        let pattern = new RegExp(prototype[`${PatternMetadata.hasPattern}${propName}`]);
                        validators.push(Validators.pattern(pattern));
                    }

                    // if (`${RangeMetadata.hasRangeFrom}${propName}` in prototype
                    //     || `${RangeMetadata.hasRangeTo}${propName}` in prototype) {
                    //     errorMessages.push(
                    //         new CustomErrorModel('range', prototype[`${RangeMetadata.errRange}${propName}`])
                    //     );
                    //     let from: number | Date = Number(prototype[`${RangeMetadata.hasRangeFrom}${propName}`]);
                    //     let to: number | Date = Number(prototype[`${RangeMetadata.hasRangeTo}${propName}`]);
                    //     if (!from && !to) {
                    //         from = Date.parse(from.toString());
                    //         to = Date.parse(to.toString());
                    //     }
                    //     validators.push(validateRange(from, to));
                    // }

                    if (`${RequiredMetadata.isRequired}${propName}` in prototype) {
                        errorMessages.push(
                            new CustomErrorModel('required', prototype[`${RequiredMetadata.errRequired}${propName}`])
                        );
                        validators.push(Validators.required);
                    }

                    let display = this.getDisplay(modelInstance, propName);
                    let inputType = this.getType(modelInstance, propName);
                    let readonly = this.isReadonly(modelInstance, propName);
                    let required = this.isRequired(modelInstance, propName);
                    let disabled = this.isDisabled(modelInstance, propName);

                    if (validators.length === 0) {
                        map[propName] = new CustomFormControl(inputType, display, null, readonly, required, disabled);
                    }
                    if (validators.length >= 1) {
                        map[propName] = new CustomFormControl(inputType, display, validators, readonly, required, disabled, errorMessages);
                    }
                    // (<any>errGroup)[propName] = errorMessages;
                }
            }
            // tODO: debug this place.
            form = this.formBuilder.group(map);
            // (<any>form)[`${AurochsesFormService.editorModel}`] = modelInstance;

            // for (let propName in errGroup) {
            //     if (propName) {
            //         if (!<CustomFormControl>form.controls[propName]) {
            //             continue;
            //         }

            //         (<CustomFormControl>form.controls[propName]).messages = (<any>errGroup)[propName];
            //     }
            // }

            return form;
        }
        return null;
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

    private getType<T>(instance: T, name: keyof T): string {
        let prototype = Object.getPrototypeOf(instance);

        if (`${HiddenMetadata.isHidden}${name}` in prototype && prototype[`${HiddenMetadata.isHidden}${name}`] === true) {
            return 'hidden';
        }

        if (typeof instance[name] === 'string') {
            return 'text';
        }

        if (typeof instance[name] === 'boolean') {
            return 'boolean';
        }

        if (typeof instance[name] === 'number') {
            return 'number';
        }

        if (instance[name] instanceof Date) {
            return 'date';
        }

        return '';
    }

    private isReadonly<T>(instance: T, name: string): boolean {
        let prototype = Object.getPrototypeOf(instance);

        return !!prototype[`${ReadonlyMetadata.isReadonly}${name}`];
    }

    private isRequired<T>(instance: T, name: string): boolean {
        let prototype = Object.getPrototypeOf(instance);

        return !!prototype[`${RequiredMetadata.isRequired}${name}`];
    }

    private isDisabled<T>(instance: T, name: string): boolean {
        let prototype = Object.getPrototypeOf(instance);

        return !!prototype[`${DisabledMetadata.isDisabled}${name}`];
    }
}
