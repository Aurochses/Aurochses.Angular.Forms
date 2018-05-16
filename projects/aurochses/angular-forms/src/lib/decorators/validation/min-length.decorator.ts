export function MinLength(length: number, message?: string) {
    return function minLengthInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${MinLengthMetadata.hasMinLength}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MinLengthMetadata.minLength}${property.toString()}`,
            {
                value: parseInt(length.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MinLengthMetadata.minLengthMessage}${property.toString()}`,
            {
                value: message || `The field ${property.toString()} needs at least ${length} characters`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasMinLength<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${MinLengthMetadata.hasMinLength}${property}`];
}

export function getMinLengthModel<T>(instance: T, property: keyof T): { minLength: number, message: string } | null {
    if (hasMinLength(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            minLength: parseInt(prototype[`${MinLengthMetadata.minLength}${property}`], 10),
            message: prototype[`${MinLengthMetadata.minLengthMessage}${property}`]
        };
    }

    return null;
}

class MinLengthMetadata {
    public static hasMinLength = '__hasMinLength__';
    public static minLength = '__minLength__';
    public static minLengthMessage = `__minLengthMessage__`;
}
