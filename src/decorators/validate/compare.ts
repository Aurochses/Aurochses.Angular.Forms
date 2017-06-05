import { CompareMetadata } from './metadata/compare.metadata';

export function Compare(withProperty: string, message?: string) {
    return function compareInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${CompareMetadata.hasCompareProperty}${property.toString()}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${CompareMetadata.withCompare}${property.toString()}`, {
            value: withProperty,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${CompareMetadata.errCompareProperty}${property.toString()}`, {
            value: message || `The field ${property.toString()} must have the same value as field ${withProperty}`,
            enumerable: false,
            configurable: false
        });
    };
}
