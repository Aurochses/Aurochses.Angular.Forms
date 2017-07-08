import { MinObject } from './shared/min.object';

export function Min(min: number | Date, message?: string) {
    return function minInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new MinObject(target, property.toString(), min, message);
    };
}
