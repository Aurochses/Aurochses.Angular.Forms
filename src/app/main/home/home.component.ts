import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { FormsModel } from '../../models/forms.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  viewModel: FormsModel;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.viewModel = new FormsModel();
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

  getReadonlyRoleIdDropdownValues(): Observable<Array<{ key: string, value: string }>> {
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

  submit(item: FormsModel): void {
    console.log(item);
  }

  cancel(): void {
    console.log('canceled');
  }

  setValue(): void {
    this.httpClient.get<FormsModel>(`/assets/forms.model.json`).subscribe(
      (item) => {
        this.viewModel = item;
      }
    );
  }
}
