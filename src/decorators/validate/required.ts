import { RequiredMetadata } from './metadata/required.metadata';

export function Required(message?: string) {
    return function requiredInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${RequiredMetadata.isRequired}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: true
        });

        Object.defineProperty(target, `${RequiredMetadata.errRequired}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${property.toString()} is required`
        });
    };
}
