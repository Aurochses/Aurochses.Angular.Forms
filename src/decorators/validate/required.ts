import { RequiredMetadata } from './metadata/required.metadata';

export function Required(message?: string) {
    return function requiredInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${RequiredMetadata.isRequired}${property.toString()}`, {
            get: function () { return true; },
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${RequiredMetadata.errRequired}${property.toString()}`, {
            value: message || `The field ${property.toString()} is required`,
            enumerable: false,
            configurable: false
        });
    };
}
