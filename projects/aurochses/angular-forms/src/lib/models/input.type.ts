import { isHidden } from '../decorators/hidden.decorator';
import { isDropdown } from '../decorators/dropdown.decorator';
import { hasData, getDataModel } from '../decorators/data.decorator';
import { DataType } from './data.type';

export enum InputType {
    default = 'default',
    hidden = 'hidden',
    dropdown = 'dropdown',
    textarea = 'textarea',
    string = 'string',
    boolean = 'boolean',
    number = 'number',
    date = 'date',
    object = 'object'
}

export function getInputType<T>(instance: T, property: keyof T): InputType {
    if (isHidden(instance, property)) {
        return InputType.hidden;
    }

    if (isDropdown(instance, property)) {
        return InputType.dropdown;
    }

    if (hasData(instance, property)) {
        const data = getDataModel(instance, property);

        if (data === DataType.multilineText) {
            return InputType.textarea;
        }
    }

    if (typeof instance[property] === 'string') {
        return InputType.string;
    }

    if (typeof instance[property] === 'boolean') {
        return InputType.boolean;
    }

    if (typeof instance[property] === 'number') {
        return InputType.number;
    }

    if (instance[property] instanceof Date) {
        return InputType.date;
    }

    if (typeof instance[property] === 'object') {
        return InputType.object;
    }

    return InputType.default;
}
