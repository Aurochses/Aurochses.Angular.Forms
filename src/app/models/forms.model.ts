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
    Readonly,
    Required
} from '@aurochses/angular-forms';

@Actions()
export class FormsModel {
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

    dateOfBirth: Date = new Date();

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

    @Readonly()
    readonlyBoolean = false;

    @Readonly()
    readonlyDate: Date = new Date();

    @Readonly()
    @Dropdown()
    @DefaultValue('value2')
    readonlyRoleId = '';

    @Readonly()
    readonlyString = '';
}
