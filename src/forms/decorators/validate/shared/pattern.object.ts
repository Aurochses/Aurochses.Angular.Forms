import { PatternMetadata } from '../metadata/pattern.metadata';

export class PatternObject {
    constructor(public target: Object, public key: string, public pattern: RegExp, public message?: string) {
        Object.defineProperty(target, `${PatternMetadata.hasPattern}${key}`, {
            configurable: false,
            enumerable: false,
            value: pattern
        });

        Object.defineProperty(target, `${PatternMetadata.errPattern}${key}`, {
            configurable: false,
            enumerable: false,
            value: message || `The field ${key} must fullfill the pattern ${pattern}`
        });
    }
}
