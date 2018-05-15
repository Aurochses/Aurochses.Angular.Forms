import { MaxLengthObject } from './shared/max-length.object';
import { MinLengthObject } from './shared/min-length.object';

export function StringLength(min: number, max: number, minMessage?: string, maxMessage?: string) {
    return function stringLengthInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MinLengthObject(target, property.toString(), min, minMessage);
        // tslint:disable-next-line:no-unused-expression
        new MaxLengthObject(target, property.toString(), max, maxMessage);
    };
}
