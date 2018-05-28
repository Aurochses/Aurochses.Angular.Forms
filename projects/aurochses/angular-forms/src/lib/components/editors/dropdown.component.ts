import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';

@Component({
    selector: 'aur-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() control: AurFormControl;
    @Input() component: Component;

    dropdownValues: Array<{ key: any, value: string }>;

    ngOnInit(): void {
        const methodName = 'get' + this.control.name.charAt(0).toUpperCase() + this.control.name.slice(1) + 'DropdownValues';

        try {
            this.dropdownValues = Object.getPrototypeOf(this.component)[methodName]();
        } catch (error) {
            console.error(methodName, error);
        }
    }
}
