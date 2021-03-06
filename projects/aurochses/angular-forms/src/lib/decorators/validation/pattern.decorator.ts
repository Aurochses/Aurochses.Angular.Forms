class PatternMetadata {
    public static hasPattern = `__hasPattern__`;
    public static pattern = `__pattern__`;
    public static patternErrorMessage = `__patternErrorMessage__`;
}

export function Pattern(pattern: RegExp, errorMessage?: string) {
    return function patternInternal(target: Object, property: string | symbol): void {
        definePattern(target, property, pattern, errorMessage);
    };
}

export function definePattern(target: Object, property: string | symbol, pattern: RegExp, errorMessage?: string) {
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
        `${PatternMetadata.patternErrorMessage}${property.toString()}`,
        {
            value: errorMessage || `The field ${property.toString()} must fullfill the pattern ${pattern}`,
            configurable: false,
            enumerable: false
        }
    );
}

export function hasPattern<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${PatternMetadata.hasPattern}${property}`];
}

export function getPatternModel<T>(instance: T, property: keyof T): { pattern: string, errorMessage: string } | null {
    if (hasPattern(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            pattern: prototype[`${PatternMetadata.pattern}${property}`],
            errorMessage: prototype[`${PatternMetadata.patternErrorMessage}${property}`]
        };
    }

    return null;
}
