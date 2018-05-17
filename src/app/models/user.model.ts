import { Actions, Display, MinLength, MaxLength, Required } from '@aurochses/angular-forms';

@Actions()
export class UserModel {
    isActive = false;

    @Display('First Name')
    firstName = '';

    @Required()
    @MinLength(5)
    @MaxLength(10)
    lastName = '';
}
