import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'date',
    template: `
                <md-input-container [formGroup]="formGroup">
                    <input mdInput [mdDatepicker]="datepicker" [formControlName]="name">
                    <button [mdDatepickerToggle]="datepicker"></button>
                </md-input-container>
                <md-datepicker #datepicker></md-datepicker>`
})
export class DateComponent {

    @Input()
    name: string;

    @Input()
    formGroup: FormGroup;
}
