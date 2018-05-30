import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {UserModel} from '../../models/user.model';
import {of as observableOf} from 'rxjs';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  viewModel: UserModel;
  values: any;
  emitter;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.viewModel = new UserModel();
    this.http.get('http://api.identityserver.test.csharp.aurochses.demo.by/api/Values')
      .subscribe(val => {
        this.values = [
          {key: 1, value: val[0]},
          {key: 2, value: val[1]}
        ];
        this.emitter.next(this.values);
      });
  }

  getRoleIdDropdownValues(): Observable<Array<{ key: number, value: string }>> {
    return new Observable<Array<{key: number, value: string}>>(
      e => this.emitter = e
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
