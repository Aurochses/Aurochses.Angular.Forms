import { Display, MinLength, MaxLength, Required } from '@aurochses/angular-forms';

export class UserModel {
    @Display('First Name')
    firstName = '';

    @Required()
    @MinLength(5)
    @MaxLength(10)
    lastName = '';
}
