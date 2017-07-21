import { DisplayMetadata } from './metadata/display.metadata';

export function Display(name: string, order: number = 0, description?: string) {
    return function displayInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisplayMetadata.displayName}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: name
        });

        Object.defineProperty(target, `${DisplayMetadata.displayOrder}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: parseInt(order.toString(), 10)
        });

        Object.defineProperty(target, `${DisplayMetadata.displayDesc}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: description
        });
    };
}
