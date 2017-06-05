import { MaxLengthObject } from './max-length';
import { MinLengthObject } from './min-length';

export function StringLength(min: number, max: number, minMessage?: string, maxMessage?: string) {
    return function stringLengthInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MinLengthObject(target, property.toString(), min, minMessage);
        // tslint:disable-next-line:no-unused-expression
        new MaxLengthObject(target, property.toString(), max, maxMessage);
    };
}
