import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomErrorModel } from '../../models/custom-error.model';
import { CustomFormControl } from '../../services/custom-form-control';

@Component({
    selector: 'dropdown',
    template: ` <md-select [formGroup]="formGroup"
                [formControlName]="control.name"
                [placeholder]="control.placeholder">
                    <md-option *ngFor="let item of dropDownValues" [value]="item.key">
                        {{item.value}}
                    </md-option>
                </md-select>`
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
        this.dropDownValues = Object.getPrototypeOf(this.component)['get' + this.control.name.charAt(0).toUpperCase() + this.control.name.slice(1) + 'DropDownValues']();
    }
}
