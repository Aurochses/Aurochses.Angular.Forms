class DefaultValueMetadata {
    public static hasDefaultValue = '__hasDefaultValue__';
    public static defaultValue = '__defaultValue__';
}

export function DefaultValue(value: any) {
    return function defaultValueInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DefaultValueMetadata.hasDefaultValue}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DefaultValueMetadata.defaultValue}${property.toString()}`,
            {
                value: value,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasDefaultValue<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${DefaultValueMetadata.hasDefaultValue}${property}`];
}

export function getDefaultValueModel<T>(instance: T, property: keyof T): any | undefined {
    if (hasDefaultValue(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return prototype[`${DefaultValueMetadata.defaultValue}${property}`];
    }

    return undefined;
}
