import {
    Actions,
    Compare,
    Data,
    DataType,
    DefaultValue,
    Display,
    Dropdown,
    Email,
    MaxLength,
    Min,
    MinLength,
    Password,
    Required
} from '@aurochses/angular-forms';

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

    @DefaultValue(10)
    @Min(0)
    num = 0;

    @Display('Role')
    @Dropdown()
    @Required()
    @DefaultValue('value1')
    roleId = '';

    @Data(DataType.multilineText)
    description = '';
}
