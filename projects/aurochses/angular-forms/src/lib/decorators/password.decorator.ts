class PasswordMetadata {
    public static password = '__password__';
}

export function Password() {
    return function passwordInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${PasswordMetadata.password}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isPassword<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${PasswordMetadata.password}${property}`];
}
