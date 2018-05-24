class RequiredMetadata {
    public static isRequired = `__isRequired__`;
    public static requiredErrorMessage = `__requiredErrorMessage__`;
}

export function Required(errorMessage?: string) {
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
            `${RequiredMetadata.requiredErrorMessage}${property.toString()}`,
            {
                value: errorMessage || `The field ${property.toString()} is required`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isRequired<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${RequiredMetadata.isRequired}${property}`];
}

export function getRequiredModel<T>(instance: T, property: keyof T): { errorMessage: string } | null {
    if (isRequired(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            errorMessage: prototype[`${RequiredMetadata.requiredErrorMessage}${property}`]
        };
    }

    return null;
}
