class DropdownMetadata {
    public static dropdown = '__dropdown__';
}

export function Dropdown() {
    return function dropdownInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DropdownMetadata.dropdown}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function isDropdown<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${DropdownMetadata.dropdown}${property}`];
}
