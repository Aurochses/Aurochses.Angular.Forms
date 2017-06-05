import { RangeMetadata } from './metadata/range.metadata';

export function Range(from: number | Date, to: number | Date, message?: string) {
    return function rangeInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${RangeMetadata.hasRangeFrom}${property.toString()}`, {
            value: from,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${RangeMetadata.hasRangeTo}${property.toString()}`, {
            value: to,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${RangeMetadata.errRange}${property.toString()}`, {
            value: message || `The field ${property.toString()} does not fall into the range from ${from} to ${to}`,
            enumerable: false,
            configurable: false
        });
    };
}
