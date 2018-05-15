import { MinLengthMetadata } from '../metadata/min-length.metadata';

export class MinLengthObject {
    constructor(public target: Object, public key: string, public length: number, public message?: string) {
        Object.defineProperty(target, `${MinLengthMetadata.hasMinLength}${key}`, {
            configurable: false,
            enumerable: false,
            value: length
        });

        Object.defineProperty(target, `${MinLengthMetadata.errMinLength}${key}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${key} needs at least ${length} characters`
        });
    }
}
