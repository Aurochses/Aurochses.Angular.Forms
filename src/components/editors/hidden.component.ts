import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'hidden',
    template: `<div  [formGroup]="formGroup"><input [formControlName]="control.name" type="hidden" /></div>`
})
export class HiddenComponent {

    @Input()
    control: Array<{ key: number, name: string, type: string, isReadonly: boolean, placeholder: string }>;

    @Input()
    formGroup: FormGroup;
}
