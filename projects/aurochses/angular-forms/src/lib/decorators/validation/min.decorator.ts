export function Min(min: number | Date, message?: string) {
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
            `${MinMetadata.minMessage}${property.toString()}`,
            {
                // todo: Ask v.rodchenko message for this place
                value: message || `The field ${property.toString()} needs at least ${min} characters`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export class MinMetadata {
    public static hasMin = '__hasMin__';
    public static min = `__min__`;
    public static minMessage = `__minMessage__`;
}
