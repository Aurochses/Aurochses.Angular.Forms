import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';
import { ErrorMessageModel } from '../../models/error-message.model';

@Component({
    selector: 'aur-string',
    templateUrl: './string.component.html'
})

export class StringComponent {

    @Input() formGroup: FormGroup;
    @Input() control: AurFormControl;

    getErrorMessage(): string {
        return (<AurFormControl>this.formGroup.controls[this.control.name]).errorMessages
            .filter((errorMessage: ErrorMessageModel) => this.formGroup.controls[this.control.name].hasError(errorMessage.type))
            .map((errorMessage: ErrorMessageModel) => errorMessage.text)[0];
    }
}
