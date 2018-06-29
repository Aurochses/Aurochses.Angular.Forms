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
    Number,
    Password,
    Range,
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

    @Display('Email', undefined, undefined, '@', ' mm')
    @Email()
    email = '';

    dateOfBirth: Date = new Date();

    isActive = false;

    @DefaultValue(10)
    @Min(0)
    num = 0;

    @Number(0.1)
    @Range(0, 1)
    numRange = 0;

    @Display('Role', 90)
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
