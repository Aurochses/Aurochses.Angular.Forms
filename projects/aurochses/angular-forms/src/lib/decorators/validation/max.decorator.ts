class MaxMetadata {
    public static hasMax = '__hasMax__';
    public static max = `__max__`;
    public static maxErrorMessage = `__maxErrorMessage__`;
}

export function Max(max: number | Date, errorMessage?: string) {
    return function maxInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${MaxMetadata.hasMax}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MaxMetadata.max}${property.toString()}`,
            {
                value: max,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MaxMetadata.maxErrorMessage}${property.toString()}`,
            {
                value: errorMessage || `The field ${property.toString()} has max value of ${max}`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasMax<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${MaxMetadata.hasMax}${property}`];
}

export function getMaxModel<T>(instance: T, property: keyof T): { max: number | Date, errorMessage: string } | null {
    if (hasMax(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            max: prototype[`${MaxMetadata.max}${property}`],
            errorMessage: prototype[`${MaxMetadata.maxErrorMessage}${property}`]
        };
    }

    return null;
}
