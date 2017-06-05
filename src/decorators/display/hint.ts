import { HintMetadata } from './metadata/hint.metadata';

export function Hint(template: string, params: { key: any, value: any }[]) {
    return function hintInternal(target: Object, name: string): void {
        Object.defineProperty(target, `${HintMetadata.hint}${name}`, {
            value: template,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${HintMetadata.hintParams}${name}`, {
            value: params,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${HintMetadata.hasHint}${name}`, {
            value: true,
            enumerable: false,
            configurable: false
        });
    };
}
