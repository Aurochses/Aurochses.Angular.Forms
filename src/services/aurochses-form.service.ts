import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PatternMetadata } from '../decorators/pattern.decorator';
import { RequiredMetadata } from '../decorators/required.decorator';
import { CustomFormControl } from './custom-form-control';

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
                    let errmsgs = new Object();

                    let isRequired = `${RequiredMetadata.isRequired}${propName}` in modelType.prototype;
                    let hasPattern = `${PatternMetadata.hasPattern}${propName}` in modelType.prototype;

                    if (isRequired) {
                        (<any>errmsgs)[`required`] = modelType.prototype[`${RequiredMetadata.errRequired}${propName}`];
                        validators.push(Validators.required);
                    }

                    if (hasPattern) {
                        (<any>errmsgs)[`pattern`] = modelType.prototype[`${PatternMetadata.errPattern}${propName}`];
                        let pattern = new RegExp(modelType.prototype[`${PatternMetadata.hasPattern}${propName}`]);
                        validators.push(Validators.pattern(pattern));
                    }

                    if (validators.length === 0) {
                        // even if there is no validator we need to add the property to the group
                        (<any>valGroup)[propName] = [modelType[propName]];
                    }
                    if (validators.length === 1) {
                        (<any>valGroup)[propName] = [modelType[propName] || '', validators[0]];
                    }
                    if (validators.length >= 1) {
                        (<any>valGroup)[propName] = [modelType[propName] || '', Validators.compose(validators)];
                    }
                    (<any>errGroup)[propName] = errmsgs;
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
