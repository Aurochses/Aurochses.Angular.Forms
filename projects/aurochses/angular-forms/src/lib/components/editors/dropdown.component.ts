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

  dropdownValues: Array<{ key: any, value: string }> = [];

  ngOnInit(): void {
    const methodName = 'get' + this.control.name.charAt(0).toUpperCase() + this.control.name.slice(1) + 'DropdownValues';

    this.component[methodName]()
      .subscribe(
        (values: Array<{ key: any, value: string }>) => {
          this.dropdownValues = values;

          if (this.control.value !== '') {
            if (values.some((value) => value.key === this.control.value)) {
              this.control.setValue(this.control.value);
            } else {
              this.control.setValue('');
            }
          }
        },
        error => console.error(methodName, error)
      );
  }
}
