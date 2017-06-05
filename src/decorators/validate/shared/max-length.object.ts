import { MaxLengthMetadata } from '../metadata/max-length.metadata';

export class MaxLengthObject {
    constructor(public target: any, public key: string, public length: number, public message?: string) {
        Object.defineProperty(target, `${MaxLengthMetadata.hasMaxLength}${key}`, {
            value: length,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${MaxLengthMetadata.errMaxLength}${key}`, {
            value: message || `The field ${key} has max length of ${length} characters`,
            enumerable: false,
            configurable: false
        });
    }
}
