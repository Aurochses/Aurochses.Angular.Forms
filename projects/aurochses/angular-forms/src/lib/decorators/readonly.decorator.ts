export function Readonly(readonly = true) {
    return function readonlyInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${ReadonlyMetadata.readonly}${property.toString()}`,
            {
                value: readonly,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isReadonly<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${ReadonlyMetadata.readonly}${property}`];
}

class ReadonlyMetadata {
    public static readonly = '__readonly__';
}
