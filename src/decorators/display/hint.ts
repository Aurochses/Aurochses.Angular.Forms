import { HintMetadata } from './metadata/hint.metadata';
import { HintType } from './models/hint.type';

export function Hint(type: HintType, params?: { key: {}, value: {} }[]) {
    return function hintInternal(target: Object, name: string): void {
        Object.defineProperty(target, `${HintMetadata.hint}${name}`, {
            configurable: false,
            enumerable: false,
            value: type
        });

        Object.defineProperty(target, `${HintMetadata.hintParams}${name}`, {
            configurable: false,
            enumerable: false,
            value: params
        });

        Object.defineProperty(target, `${HintMetadata.hasHint}${name}`, {
            configurable: false,
            enumerable: false,
            value: true
        });
    };
}
