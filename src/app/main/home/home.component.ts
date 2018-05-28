import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  viewModel: UserModel;

  constructor() { }

  ngOnInit(): void {
    this.viewModel = new UserModel();
  }

  getRoleIdDropdownValues(): Array<{ key: number, value: string }> {
    return [
      { key: 1, value: 'User' },
      { key: 2, value: 'Admin' }
    ];
  }

  submit(item: UserModel): void {
    console.log(item);
  }

  cancel(): void {
    console.log('canceled');
  }

  setValue(): void {
    const newUserModel = new UserModel();

    newUserModel.firstName = 'John';

    this.viewModel = newUserModel;
  }
}
