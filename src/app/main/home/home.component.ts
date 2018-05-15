import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormsService } from '@aurochses/angular-forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  formGroup: FormGroup;
  component: Object;

  constructor(private formsService: AurFormsService) { }

  ngOnInit(): void {
    this.formGroup = this.formsService.build(UserModel);

    console.log(this.formGroup);
  }

}
