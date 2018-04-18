import { MaxLengthObject } from './shared/max-length.object';

export function MaxLength(length: number, message?: string) {
    return function maxLengthInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MaxLengthObject(target, property.toString(), length, message);
    };
}
