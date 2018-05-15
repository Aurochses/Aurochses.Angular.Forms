export function Pattern(pattern: RegExp, message?: string) {
    return function patternInternal(target: Object, property: string | symbol): void {
        definePattern(target, property, pattern, message);
    };
}

export function definePattern(target: Object, property: string | symbol, pattern: RegExp, message?: string) {
    Object.defineProperty(
        target,
        `${PatternMetadata.hasPattern}${property.toString()}`,
        {
            value: true,
            configurable: false,
            enumerable: false
        }
    );

    Object.defineProperty(
        target,
        `${PatternMetadata.pattern}${property.toString()}`,
        {
            value: pattern,
            configurable: false,
            enumerable: false
        }
    );

    Object.defineProperty(
        target,
        `${PatternMetadata.patternMessage}${property.toString()}`,
        {
            value: message || `The field ${property.toString()} must fullfill the pattern ${pattern}`,
            configurable: false,
            enumerable: false
        }
    );
}

export class PatternMetadata {
    public static hasPattern = `__hasPattern__`;
    public static pattern = `__pattern__`;
    public static patternMessage = `__patternMessage__`;
}
