import { MaxMetadata } from '../metadata/max.metadata';

export class MaxObject {
    constructor(public target: Object, public key: string, public max: number | Date, public message?: string) {
        Object.defineProperty(target, `${MaxMetadata.hasMax}${key}`, {
            configurable: false,
            enumerable: false,
            value: max
        });

        Object.defineProperty(target, `${MaxMetadata.errMax}${key}`, {
            configurable: false,
            enumerable: false,
            // todo: Ask v.rodchenko message for this place
            value: message || `The field ${key} has max length of ${max} characters`
        });
    }
}
