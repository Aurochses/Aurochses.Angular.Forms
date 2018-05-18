export function Compare(withProperty: string, errorMessage?: string) {
    return function compareInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${CompareMetadata.hasCompare}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${CompareMetadata.compareWithProperty}${property.toString()}`,
            {
                value: withProperty,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${CompareMetadata.compareErrorMessage}${property.toString()}`,
            {
                value: errorMessage || `The field ${property.toString()} must have the same value as field ${withProperty}`,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasCompare<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${CompareMetadata.hasCompare}${property}`];
}

export function getCompareModel<T>(instance: T, property: keyof T): { withProperty: string, errorMessage: string } | null {
    if (hasCompare(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            withProperty: prototype[`${CompareMetadata.compareWithProperty}${property}`],
            errorMessage: prototype[`${CompareMetadata.compareErrorMessage}${property}`]
        };
    }

    return null;
}

class CompareMetadata {
    public static hasCompare = '__hasCompare__';
    public static compareWithProperty = `__compareWithProperty__`;
    public static compareErrorMessage = `__compareErrorMessage__`;
}
