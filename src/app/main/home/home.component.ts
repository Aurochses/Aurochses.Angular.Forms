import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  viewModel: UserModel;
  roleIdDropdownValuesLoadeded = new EventEmitter<Array<{ key: string, value: string }>>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.viewModel = new UserModel();

    this.httpClient.get('http://api.identityserver.test.csharp.aurochses.demo.by/api/Values')
      .subscribe(
        (values: string[]) => {
          const result = new Array<{ key: string, value: string }>();

          values.forEach(
            (value) => {
              result.push({ key: value, value: value });
            }
          );

          return this.roleIdDropdownValuesLoadeded.emit(result);
        }
      );
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
