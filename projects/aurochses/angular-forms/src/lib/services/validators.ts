import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CustomFormControl } from './custom-form-control';

export function Min(min: number | Date): ValidatorFn {
    return function minInternal(control: CustomFormControl): ValidationErrors | null {

        if (control.value == null || min == null) {
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

export function Max(max: number | Date): ValidatorFn {
    return function (control: CustomFormControl): ValidationErrors | null {

        if (control.value == null || max == null) {
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

export function Compare(propertyName: string, formGroup: FormGroup) {
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
