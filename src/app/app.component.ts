import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AurochsesFormService, Hidden, Display,Required,
  Readonly, Disabled, Email, StringLength, MinLength, Compare, Hint, HintType } from '../forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formService: AurochsesFormService) { }
  
  ngOnInit(): void {
    this.formGroup = this.formService.build(FormModel);
  }
}

export class FormModel {

  @Hidden()
  id = 0;

  @Display('User name', 1, 'wewe')
  @Disabled()
  name = '';

  @Display('Email address', 2, 'wewe')
  @Email()
  @Required()
  // @MaxLength(10)
  // @MinLength(5)
  @StringLength(5, 10)
  email = '';

  @Display('Password', 3, 'wewe')
  @Required()
  @MinLength(5)
  password = '';

  @Display('Confirm password', 4, 'wewe')
  @Compare('password')
  @Required()
  confirmPassword = '';

  @Display('Years', 5, 'wewe')
  @Required()
  years = 0;

  @Readonly(false)
  @Required('This field is required!!!')
  @Display('Date', 6, 'wewe')
  date: Date = new Date();

  @Display('Check', 7, 'wewe')
  check = false;

  // @Hint(HintType.enum)
  // @Display('Check', 8, 'wewe')
  // type: Type = Type.one;

  // @Hint(HintType.dropdown)
  // @Display('List', 9, 'wewe')
  // list = '0';

  // @Hint(HintType.dropdown)
  // @Display('List2', 11)
  // list2 = '0';

  @Hint(HintType.text)
  @Display('TextArea', 10, 'wewe')
  anytext = '';
  // @Display('Type', 10, 'wewe')
  // @Hint('enum', [{ key: 0, value: 'one' }, { key: 1, value: 'two' }])
  // type: Type = Type.one;
}
