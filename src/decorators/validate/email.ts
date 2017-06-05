import { PatternObject } from './pattern';

export function Email(message?: string) {
    // tslint:disable-next-line:max-line-length
    let pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return function emailInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:no-unused-expression
        new PatternObject(target, property.toString(), pattern, message || `The field ${property.toString()} must contain a valid e-mail address.`);
    };
}
