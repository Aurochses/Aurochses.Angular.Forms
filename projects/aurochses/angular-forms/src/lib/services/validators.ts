import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { AurFormControl } from '../models/form-control.model';

export function Min(min: number | Date): ValidatorFn {
    return function minInternal(control: AurFormControl): ValidationErrors | null {

        if (control.value == null || min == null) {
            return null;
        }

        if (Number(min) && Number(control.value)) {
            min = Number(min);
            const value = Number(control.value);
            return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
        }

        if (Date.parse(min.toString()) && Date.parse(control.value)) {
            min = Date.parse(min.toString());
            const value = Date.parse(control.value);
            return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
        }

        return null;
    };
}

export function Max(max: number | Date): ValidatorFn {
    return function (control: AurFormControl): ValidationErrors | null {

        if (control.value == null || max == null) {
            return null;
        }

        if (Number(max) && Number(control.value)) {
            max = Number(max);
            const value = Number(control.value);
            return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
        }

        if (Date.parse(max.toString()) && Date.parse(control.value)) {
            max = Date.parse(max.toString());
            const value = Date.parse(control.value);
            return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
        }

        return null;
    };
}

export function Compare(propertyName: string, formGroup: FormGroup) {
    let changeEventWasAdded = false;

    return (control: AurFormControl): ValidationErrors | null => {
        if (formGroup && formGroup.controls && !changeEventWasAdded) {
            formGroup.controls[propertyName].valueChanges.subscribe(
                () => {
                    control.updateValueAndValidity();
                }
            );

            changeEventWasAdded = true;
        }

        const value = control.value;
        return (!isNaN(value) && value === formGroup.controls[propertyName].value) ? null : { 'compare': { valid: false } };
    };
}
