import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AurochsesFormService {

    public static editorModel = '__editorModel__';

    constructor(private formBuilder: FormBuilder) { }

    public build(modelType: any): FormGroup | null {
        let valGroup: any = {};
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
                    (<any>valGroup)[propName] = [modelType[propName]];
                }
            }
            form = this.formBuilder.group(valGroup);
            (<any>form)[`${AurochsesFormService.editorModel}`] = modelInstance;

            return form;
        }
        return null;
    }
}
