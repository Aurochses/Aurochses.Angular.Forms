import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  viewModel: UserModel;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.viewModel = new UserModel();
  }

  getRoleIdDropdownValues(): Observable<Array<{ key: string, value: string }>> {
    return this.httpClient.get(`${environment.apiUrl}/api/Values`)
      .pipe(
        map(
          (values: string[]) => {
            const result = new Array<{ key: string, value: string }>();

            values.forEach(
              (value) => {
                result.push({ key: value, value: value });
              }
            );

            return result;
          }
        )
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
