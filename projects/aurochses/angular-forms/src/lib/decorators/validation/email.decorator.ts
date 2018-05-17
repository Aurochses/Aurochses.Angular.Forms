import { definePattern } from './pattern.decorator';

export function Email(
    // tslint:disable-next-line:max-line-length
    pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage?: string
) {
    return function emailInternal(target: Object, property: string | symbol): void {
        definePattern(target, property, pattern, errorMessage || `The field ${property.toString()} must contain a valid e-mail address.`);
    };
}
