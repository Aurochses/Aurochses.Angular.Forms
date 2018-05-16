export function Range(min: number | Date, max: number | Date, message?: string) {
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
            `${RangeMetadata.rangeMessage}${property.toString()}`,
            {
                value: message || `${property.toString()} must be between ${min} and ${max}`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export class RangeMetadata {
    public static hasRange = '__hasRange__';
    public static rangeMin = `__rangeMin__`;
    public static rangeMax = `__rangeMax__`;
    public static rangeMessage = `__rangeMessage__`;
}
