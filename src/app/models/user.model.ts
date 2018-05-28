import { Actions, Compare, Display, Dropdown, Email, MaxLength, MinLength, Password, Required } from '@aurochses/angular-forms';

@Actions()
export class UserModel {
    @Display('First Name')
    firstName = '';

    @Required()
    @MinLength(5)
    @MaxLength(10)
    lastName = '';

    @Password()
    password = '';

    @Password()
    @Compare('password')
    comparePassword = '';

    @Email()
    email = '';

    isActive = false;

    num = 0;

    @Display('Role')
    @Dropdown()
    roleId = 0;
}
