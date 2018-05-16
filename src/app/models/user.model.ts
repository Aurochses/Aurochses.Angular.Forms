import { Display, Required } from '@aurochses/angular-forms';

export class UserModel {
    @Display('First Name')
    firstName = '';

    @Required()
    lastName = '';
}
