import { MinLengthMetadata } from '../metadata/min-length.metadata';

export class MinLengthObject {
    constructor(public target: any, public key: string, public length: number, public message?: string) {
        Object.defineProperty(target, `${MinLengthMetadata.hasMinLength}${key}`, {
            value: length,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${MinLengthMetadata.errMinLength}${key}`, {
            value: message || `The field ${key} needs at least ${length} characters`,
            enumerable: false,
            configurable: false
        });
    }
}
