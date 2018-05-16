export function MaxLength(length: number, message?: string) {
    return function maxLengthInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${MaxLengthMetadata.hasMaxLength}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MaxLengthMetadata.maxLength}${property.toString()}`,
            {
                value: parseInt(length.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MaxLengthMetadata.maxLengthMessage}${property.toString()}`,
            {
                value: message || `The field ${property.toString()} has max length of ${length} characters`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasMaxLength<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${MaxLengthMetadata.hasMaxLength}${property}`];
}

export function getMaxLengthModel<T>(instance: T, property: keyof T): { maxLength: number, message: string } | null {
    if (hasMaxLength(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            maxLength: parseInt(prototype[`${MaxLengthMetadata.maxLength}${property}`], 10),
            message: prototype[`${MaxLengthMetadata.maxLengthMessage}${property}`]
        };
    }

    return null;
}

class MaxLengthMetadata {
    public static hasMaxLength = '__hasMaxLength__';
    public static maxLength = '__maxLength__';
    public static maxLengthMessage = `__maxLengthMessage__`;
}
