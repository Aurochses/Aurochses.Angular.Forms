export function Display(name: string, order: number = 0, description?: string) {
    return function displayInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisplayMetadata.displayName}${property.toString()}`, {
            value: name,
            configurable: false,
            enumerable: false
        });

        Object.defineProperty(target, `${DisplayMetadata.displayOrder}${property.toString()}`, {
            value: parseInt(order.toString(), 10),
            configurable: false,
            enumerable: false
        });

        Object.defineProperty(target, `${DisplayMetadata.displayDescription}${property.toString()}`, {
            value: description,
            configurable: false,
            enumerable: false
        });
    };
}

export class DisplayMetadata {
    public static displayName = `__displayName__`;
    public static displayOrder = `__displayOrder__`;
    public static displayDescription = `__displayDescription__`;
}
