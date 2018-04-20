import { MaxLengthMetadata } from '../metadata/max-length.metadata';

export class MaxLengthObject {
    constructor(public target: Object, public key: string, public length: number, public message?: string) {
        Object.defineProperty(target, `${MaxLengthMetadata.hasMaxLength}${key}`, {
            configurable: false,
            enumerable: false,
            value: length
        });

        Object.defineProperty(target, `${MaxLengthMetadata.errMaxLength}${key}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${key} has max length of ${length} characters`
        });
    }
}
