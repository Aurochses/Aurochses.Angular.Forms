import { PatternMetadata } from '../metadata/pattern.metadata';

export class PatternObject {
    constructor(public target: any, public key: string, public pattern: RegExp, public message?: string) {
        Object.defineProperty(target, `${PatternMetadata.hasPattern}${key}`, {
            value: pattern,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${PatternMetadata.errPattern}${key}`, {
            value: message || `The field ${key} must fullfill the pattern ${pattern}`,
            enumerable: false,
            configurable: false
        });
    }
}
