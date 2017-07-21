import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CustomFormControl } from './custom-form-control';

// tslint:disable-next-line:no-any
function isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
}

export class AurochsesValidators {

    static min(min: number | Date): ValidatorFn {
        return (control: CustomFormControl): ValidationErrors | null => {

            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null;
            }

            if (Number(min) && Number(control.value)) {
                min = Number(min);
                let value = Number(control.value);
                return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
            }
            if (Date.parse(min.toString()) && Date.parse(control.value)) {
                min = Date.parse(min.toString());
                let value = Date.parse(control.value);
                return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
            }

            return null;
        };
    }

    static max(max: number | Date): ValidatorFn {
        return (control: CustomFormControl): ValidationErrors | null => {

            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null;
            }

            if (Number(max) && Number(control.value)) {
                max = Number(max);
                let value = Number(control.value);
                return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
            }

            if (Date.parse(max.toString()) && Date.parse(control.value)) {
                max = Date.parse(max.toString());
                let value = Date.parse(control.value);
                return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
            }

            return null;
        };
    }

    static compare(propertyName: string, formGroup: FormGroup) {
        let changeEventWasAdded: boolean = false;
        return (control: CustomFormControl): ValidationErrors | null => {
            if (formGroup && formGroup.controls && !changeEventWasAdded) {
                formGroup.controls[propertyName].valueChanges.subscribe(() => {
                    control.updateValueAndValidity();
                });
                changeEventWasAdded = true;
            }

            let value = control.value;
            return (!isNaN(value) && value === formGroup.controls[propertyName].value) ? null : { 'compare': { valid: false } };
        };
    }
}
