import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'textarea',
    template: `<md-input-container [formGroup]="formGroup">
                    <input mdInput [formControlName]="control.name" [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder" [required]="control.isRequired">
                    <md-error *ngFor="let message of messages()">{{ message }}</md-error>
                </md-input-container>`
})

export class TextAreaComponent {

    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;
}
