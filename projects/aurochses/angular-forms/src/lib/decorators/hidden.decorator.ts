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

export class HiddenMetadata {
    public static hidden = '__hidden__';
}
