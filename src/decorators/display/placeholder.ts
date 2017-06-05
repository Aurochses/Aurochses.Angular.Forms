import { PlaceHolderMetadata } from './metadata/placeholder.metadata';

export function Placeholder(name: string) {
    return function placeholderInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${PlaceHolderMetadata.watermark}${property.toString()}`, {
            value: name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${PlaceHolderMetadata.hasWatermark}${property.toString()}`, {
            value: true,
            enumerable: false,
            configurable: false
        });
    };
}
