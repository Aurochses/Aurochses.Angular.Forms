import { RangeMetadata } from './metadata/range.metadata';

export function Range(from: number | Date, to: number | Date, message?: string) {
    return function rangeInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${RangeMetadata.hasRangeFrom}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: from
        });

        Object.defineProperty(target, `${RangeMetadata.hasRangeTo}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: to
        });

        Object.defineProperty(target, `${RangeMetadata.errRange}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${property.toString()} does not fall into the range from ${from} to ${to}`
        });
    };
}
