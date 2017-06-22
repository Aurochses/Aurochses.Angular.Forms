import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlModel } from '../../models/control.model';

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
    control: ControlModel;

    @Input()
    formGroup: FormGroup;
}
