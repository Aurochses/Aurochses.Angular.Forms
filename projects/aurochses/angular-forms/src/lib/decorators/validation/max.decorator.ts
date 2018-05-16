export function Max(max: number | Date, message?: string) {
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
            `${MaxMetadata.maxMessage}${property.toString()}`,
            {
                // todo: Ask v.rodchenko message for this place
                value: message || `The field ${property.toString()} has max length of ${max} characters`,
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

export function getMaxModel<T>(instance: T, property: keyof T): { max: number | Date, message: string } | null {
    if (hasMax(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            max: prototype[`${MaxMetadata.max}${property}`],
            message: prototype[`${MaxMetadata.maxMessage}${property}`]
        };
    }

    return null;
}

class MaxMetadata {
    public static hasMax = '__hasMax__';
    public static max = `__max__`;
    public static maxMessage = `__maxMessage__`;
}
