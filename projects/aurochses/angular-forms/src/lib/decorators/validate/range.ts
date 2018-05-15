import { MaxObject } from './shared/max.object';
import { MinObject } from './shared/min.object';

export function Range(min: number | Date, max: number | Date, minMessage?: string, maxMessage?: string) {
    return function rangeInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MinObject(target, property.toString(), min, minMessage);
        // tslint:disable-next-line:no-unused-expression
        new MaxObject(target, property.toString(), max, maxMessage);
    };
}
