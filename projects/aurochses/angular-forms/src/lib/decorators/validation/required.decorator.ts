export function Required(message?: string) {
    return function requiredInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${RequiredMetadata.isRequired}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${RequiredMetadata.requiredMessage}${property.toString()}`,
            {
                value: message || `The field ${property.toString()} is required`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export class RequiredMetadata {
    public static isRequired = `__isRequired__`;
    public static requiredMessage = `__requiredMessage__`;
}
