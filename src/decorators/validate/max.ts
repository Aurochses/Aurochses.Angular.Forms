import { MaxObject } from './shared/max.object';

export function Max(max: number | Date, message?: string) {
    return function maxInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MaxObject(target, property.toString(), max, message);
    };
}
