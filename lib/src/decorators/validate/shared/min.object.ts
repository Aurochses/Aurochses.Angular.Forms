import { MinMetadata } from '../metadata/min.metadata';

export class MinObject {
    constructor(public target: Object, public key: string, public min: number | Date, public message?: string) {
        Object.defineProperty(target, `${MinMetadata.hasMin}${key}`, {
            configurable: false,
            enumerable: false,
            value: min
        });

        Object.defineProperty(target, `${MinMetadata.errMin}${key}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${key} needs at least ${min} characters`
        });
    }
}
