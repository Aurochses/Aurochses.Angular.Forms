import { hasHint } from '../decorators/hint.decorator';
import { isHidden } from '../decorators/hidden.decorator';

export enum InputType {
    default = 'default',
    hint = 'hint',
    hidden = 'hidden',
    string = 'string',
    boolean = 'boolean',
    number = 'number',
    date = 'date',
    object = 'object'
}

export function getInputType<T>(instance: T, property: keyof T): InputType {
    if (hasHint(instance, property)) {
        return InputType.hint;
    }

    if (isHidden(instance, property)) {
        return InputType.hidden;
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
