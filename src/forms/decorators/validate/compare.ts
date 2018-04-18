import { CompareMetadata } from './metadata/compare.metadata';

export function Compare(withProperty: string, message?: string) {
    return function compareInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${CompareMetadata.hasCompareProperty}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: true
        });

        Object.defineProperty(target, `${CompareMetadata.withCompare}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: withProperty
        });

        Object.defineProperty(target, `${CompareMetadata.errCompareProperty}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${property.toString()} must have the same value as field ${withProperty}`
        });
    };
}
