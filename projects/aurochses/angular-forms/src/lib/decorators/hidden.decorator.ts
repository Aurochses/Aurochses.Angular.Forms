export function Hidden(hide = true) {
    return function hiddenInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${HiddenMetadata.hidden}${property.toString()}`,
            {
                value: hide,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isHidden<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${HiddenMetadata.hidden}${property}`];
}

class HiddenMetadata {
    public static hidden = '__hidden__';
}
