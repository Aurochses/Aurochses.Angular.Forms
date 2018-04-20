import { MinLengthObject } from './shared/min-length.object';

export function MinLength(length: number, message?: string) {
    return function minLengthInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MinLengthObject(target, property.toString(), length, message);
    };
}
