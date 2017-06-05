import { DisplayMetadata } from './metadata/display.metadata';

export function Display(name: string, order: number = 0, description?: string) {
    return function displayInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisplayMetadata.displayName}${property.toString()}`, {
            value: name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${DisplayMetadata.displayOrder}${property.toString()}`, {
            value: parseInt(order.toString(), 10),
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${DisplayMetadata.displayDesc}${property.toString()}`, {
            value: description,
            enumerable: false,
            configurable: false
        });
    };
}
