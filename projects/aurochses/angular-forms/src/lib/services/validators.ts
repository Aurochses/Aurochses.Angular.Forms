import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { AurFormControl } from '../models/form-control.model';

export function Min(min: number): ValidatorFn {
    return function minInternal(control: AurFormControl): ValidationErrors | null {

        if (control.value == null || min == null) {
            return null;
        }

        const value = Number(control.value);
        return !isNaN(value) && value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
    };
}

export function MinDate(min: Date): ValidatorFn {
    return function minDateInternal(control: AurFormControl): ValidationErrors | null {

        if (control.value == null || min == null) {
            return null;
        }

        const value = new Date(control.value);
        return value < min ? { 'min': { 'min': min, 'actual': control.value } } : null;
    };
}

export function Max(max: number): ValidatorFn {
    return function (control: AurFormControl): ValidationErrors | null {

        if (control.value == null || max == null) {
            return null;
        }

        const value = Number(control.value);
        return !isNaN(value) && value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
    };
}

export function MaxDate(max: Date): ValidatorFn {
    return function (control: AurFormControl): ValidationErrors | null {

        if (control.value == null || max == null) {
            return null;
        }

        const value = new Date(control.value);
        return value > max ? { 'max': { 'max': max, 'actual': control.value } } : null;
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
        return value && value === formGroup.controls[propertyName].value ? null : { 'compare': { valid: false } };
    };
}
