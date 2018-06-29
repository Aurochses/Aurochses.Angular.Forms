class RangeMetadata {
    public static hasRange = '__hasRange__';
    public static rangeMin = `__rangeMin__`;
    public static rangeMax = `__rangeMax__`;
    public static rangeErrorMessage = `__rangeErrorMessage__`;
}

export function Range(min: number, max: number, errorMessage?: string) {
    return function rangeInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${RangeMetadata.hasRange}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${RangeMetadata.rangeMin}${property.toString()}`,
            {
                value: min,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${RangeMetadata.rangeMax}${property.toString()}`,
            {
                value: max,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${RangeMetadata.rangeErrorMessage}${property.toString()}`,
            {
                value: errorMessage || `${property.toString()} must be between ${min} and ${max}`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasRange<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${RangeMetadata.hasRange}${property}`];
}

export function getRangeModel<T>(instance: T, property: keyof T): { min: number, max: number, errorMessage: string } | null {
    if (hasRange(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            min: prototype[`${RangeMetadata.rangeMin}${property}`],
            max: prototype[`${RangeMetadata.rangeMax}${property}`],
            errorMessage: prototype[`${RangeMetadata.rangeErrorMessage}${property}`]
        };
    }

    return null;
}
