import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';

@Component({
    selector: 'aur-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropDownComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() control: AurFormControl;
    @Input() component: Component;

    dropDownValues: Array<{ key: string, value: string }>;

    ngOnInit(): void {
        // todo: v.rodchenko: solve this!!!
        const methodName = 'get' + this.control.name.charAt(0).toUpperCase() + this.control.name.slice(1) + 'DropDownValues';

        try {
            this.dropDownValues = Object.getPrototypeOf(this.component)[methodName]();
        } catch (error) {
            console.error(methodName, error);
        }
    }
}
