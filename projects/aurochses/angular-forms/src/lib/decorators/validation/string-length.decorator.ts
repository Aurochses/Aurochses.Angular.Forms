export function StringLength(min: number, max: number, message?: string) {
    return function stringLengthInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${StringLengthMetadata.hasStringLength}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${StringLengthMetadata.stringLengthMin}${property.toString()}`,
            {
                value: parseInt(min.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${StringLengthMetadata.stringLengthMax}${property.toString()}`,
            {
                value: parseInt(max.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${StringLengthMetadata.stringLengthMessage}${property.toString()}`,
            {
                value: message || `${property.toString()} must be between ${min} and ${max} characters`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

class StringLengthMetadata {
    public static hasStringLength = '__hasStringLength__';
    public static stringLengthMin = `__stringLengthMin__`;
    public static stringLengthMax = `__stringLengthMax__`;
    public static stringLengthMessage = `__stringLengthMessage__`;
}
