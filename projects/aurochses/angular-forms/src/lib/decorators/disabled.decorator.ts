export function Disabled(disabled = true) {
    return function disabledInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DisabledMetadata.disabled}${property.toString()}`,
            {
                value: disabled,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isDisabled<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${DisabledMetadata.disabled}${property}`];
}

class DisabledMetadata {
    public static disabled = '__disabled__';
}
