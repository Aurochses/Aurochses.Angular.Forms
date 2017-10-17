import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'dropdown',
    template: ` <mat-form-field [formGroup]="formGroup">
                    <mat-select [formControlName]="control.name"
                    [placeholder]="control.placeholder">
                        <mat-option *ngFor="let item of dropDownValues" [value]="item.key">
                            {{item.value}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>`
})
export class DropDownComponent implements OnInit {

    @Input()
    control: CustomFormControl;

    @Input()
    component: Component;

    @Input()
    formGroup: FormGroup;

    dropDownValues: Array<{ key: string, value: string }>;

    ngOnInit(): void {

        let methodName = 'get' + this.control.name.charAt(0).toUpperCase() + this.control.name.slice(1) + 'DropDownValues';

        try {
            this.dropDownValues = Object.getPrototypeOf(this.component)[methodName]();
        } catch (error) {
            console.error(methodName, error);
        }
    }
}
