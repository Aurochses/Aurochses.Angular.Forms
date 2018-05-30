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
    const eventName = this.control.name + 'DropdownValuesLoadeded';

    this.component[eventName]
      .subscribe(
        (values: Array<{ key: any, value: string }>) => {
          this.dropdownValues = values;
        },
        error => console.error(eventName, error)
      );
  }
}
