import { PatternObject } from './shared/pattern.object';

export function Pattern(pattern: RegExp, message?: string) {
    return function patternInternal(target: Object, property: string | symbol): void {
        // tslint:disable-next-line:no-unused-expression
        new PatternObject(target, property.toString(), pattern, message);
    };
}
