class MinMetadata {
    public static hasMin = '__hasMin__';
    public static min = `__min__`;
    public static minErrorMessage = `__minErrorMessage__`;
}

export function Min(min: number | Date, errorMessage?: string) {
    return function minInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${MinMetadata.hasMin}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MinMetadata.min}${property.toString()}`,
            {
                value: min,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${MinMetadata.minErrorMessage}${property.toString()}`,
            {
                // todo: Ask v.rodchenko message for this place
                value: errorMessage || `The field ${property.toString()} has min value of ${min}`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasMin<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${MinMetadata.hasMin}${property}`];
}

export function getMinModel<T>(instance: T, property: keyof T): { min: number | Date, errorMessage: string } | null {
    if (hasMin(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            min: prototype[`${MinMetadata.min}${property}`],
            errorMessage: prototype[`${MinMetadata.minErrorMessage}${property}`]
        };
    }

    return null;
}
