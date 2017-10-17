import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'text',
    template: ` <mat-form-field [formGroup]="formGroup">
                    <textarea matInput
                    mdTextareaAutosize
                    [formControlName]="control.name"
                    [readOnly]="control.isReadonly"
                    [placeholder]="control.placeholder"
                    [required]="control.isRequired"
                    [maxlength]="control.maxLength"
                    [minlength]="control.minLength"></textarea>
                    <mat-hint *ngIf="control.maxLength" align="end">
                        {{ formGroup.controls[control.name].value.length }} / {{ control.maxLength }}
                    </mat-hint>
                    <mat-error>
                        {{ message() }}
                    </mat-error>
                </mat-form-field>`
})

export class TextComponent {
    @Input()
    control: CustomFormControl;

    @Input()
    formGroup: FormGroup;

    message(): string {
        return (<CustomFormControl>this.formGroup.controls[this.control.name]).errorMessages
            .filter((error: CustomErrorModel) => this.formGroup.controls[this.control.name].hasError(error.type))
            .map((error: CustomErrorModel) => error.message)[0];
    }
}
