import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
    CompareMetadata,
    MaxLengthMetadata,
    MinLengthMetadata,
    PatternMetadata,
    RangeMetadata,
    RequiredMetadata
} from '../decorators/validate/metadata';

import { CustomFormControl } from './custom-form-control';

function validateCompare(p: string) {
    let changeEventWasAdded: boolean = false;
    return function (formControl: FormControl) {
        let form: FormGroup = formControl.root as FormGroup;
        if (form && form.controls && !changeEventWasAdded) {
            form.controls[p].valueChanges.subscribe(() => {
                formControl.updateValueAndValidity();
            });
            changeEventWasAdded = true;
        }
        if (formControl.value) {
            return (!formControl.value || formControl.value === (<any>formControl.root)[`controls`][p].value) ? null : {
                'compare': {
                    valid: false
                }
            };
        }
    };
}

function validateRange(from: number | Date, to: number | Date) {

    return function (formControl: FormControl) {
        if ((Number(from) || Number(to)) && Number(formControl.value)) {
            from = Number(from);
            to = Number(to);
            let value = Number(formControl.value);
            return (!from || value >= from) && (!to || value <= to) ? null : {
                'range': {
                    valid: false
                }
            };
        }
        if ((Date.parse(from.toString()) || Date.parse(to.toString())) && Date.parse(formControl.value)) {
            from = Date.parse(from.toString());
            to = Date.parse(to.toString());
            let value = Date.parse(formControl.value);
            return (!from || value >= from) && (!to || value <= to) ? null : {
                'range': {
                    valid: false
                }
            };
        }
    };
}


@Injectable()
export class AurochsesFormService {

    public static editorModel = '__editorModel__';

    constructor(private formBuilder: FormBuilder) { }

    public build(modelType: any): FormGroup | null {
        let valGroup: any = {};
        let errGroup: any = {};
        let form: FormGroup;
        let modelInstance: any;
        if (modelType) {
            try {
                modelInstance = new modelType();
            } catch (ex) {
                console.error('Invalid viewmodel for FormValidatorService');
            }
        }

        if (modelInstance) {
            for (let propName in modelInstance) {
                if (propName) {
                    let validators = new Array<any>();
                    let errorMessages = new Object();

                    if (`${CompareMetadata.hasCompareProperty}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`compare`] = modelType.prototype[`${CompareMetadata.errCompareProperty}${propName}`];
                        validators.push(validateCompare(modelType.prototype[`${CompareMetadata.withCompare}${propName}`]));
                    }

                    if (`${MaxLengthMetadata.hasMaxLength}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`maxlength`] = modelType.prototype[`${MaxLengthMetadata.errMaxLength}${propName}`];
                        let maxLength = parseInt(modelType.prototype[`${MaxLengthMetadata.hasMaxLength}${propName}`], 10);
                        validators.push(Validators.maxLength(maxLength));
                    }

                    if (`${MinLengthMetadata.hasMinLength}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`minlength`] = modelType.prototype[`${MinLengthMetadata.errMinLength}${propName}`];
                        let minLength = parseInt(modelType.prototype[`${MinLengthMetadata.hasMinLength}${propName}`], 10);
                        validators.push(Validators.minLength(minLength));
                    }

                    if (`${PatternMetadata.hasPattern}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`pattern`] = modelType.prototype[`${PatternMetadata.errPattern}${propName}`];
                        let pattern = new RegExp(modelType.prototype[`${PatternMetadata.hasPattern}${propName}`]);
                        validators.push(Validators.pattern(pattern));
                    }

                    if (`${RangeMetadata.hasRangeFrom}${propName}` in modelType.prototype
                        || `${RangeMetadata.hasRangeTo}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`range`] = modelType.prototype[`${RangeMetadata.errRange}${propName}`];
                        let from: number | Date = Number(modelType.prototype[`${RangeMetadata.hasRangeFrom}${propName}`]);
                        let to: number | Date = Number(modelType.prototype[`${RangeMetadata.hasRangeTo}${propName}`]);
                        if (!from && !to) {
                            from = Date.parse(from.toString());
                            to = Date.parse(to.toString());
                        }
                        validators.push(validateRange(from, to));
                    }

                    if (`${RequiredMetadata.isRequired}${propName}` in modelType.prototype) {
                        (<any>errorMessages)[`required`] = modelType.prototype[`${RequiredMetadata.errRequired}${propName}`];
                        validators.push(Validators.required);
                    }

                    if (validators.length === 0) {
                        (<any>valGroup)[propName] = [modelType[propName]];
                    }
                    if (validators.length === 1) {
                        (<any>valGroup)[propName] = [modelType[propName] || '', validators[0]];
                    }
                    if (validators.length >= 1) {
                        (<any>valGroup)[propName] = [modelType[propName] || '', Validators.compose(validators)];
                    }
                    (<any>errGroup)[propName] = errorMessages;
                }
            }

            form = this.formBuilder.group(valGroup);
            (<any>form)[`${AurochsesFormService.editorModel}`] = modelInstance;

            for (let propName in errGroup) {
                if (propName) {
                    if (!<CustomFormControl>form.controls[propName]) {
                        continue;
                    }

                    (<CustomFormControl>form.controls[propName]).messages = (<any>errGroup)[propName];
                }
            }

            return form;
        }
        return null;
    }
}
