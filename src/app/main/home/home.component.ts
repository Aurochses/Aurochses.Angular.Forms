import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormService } from '@aurochses/angular-forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formService: AurFormService) { }

  ngOnInit(): void {
    this.formGroup = this.formService.build(UserModel);
  }

  submit(item: UserModel): void {
    console.log(item);
  }

  cancel(): void {
    console.log('canceled');
  }

}
