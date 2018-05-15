import { HintType } from '../models/hint.type';

export function Hint(hint: HintType, params?: { key: {}, value: {} }[]) {
    return function hintInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${HintMetadata.hasHint}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${HintMetadata.hint}${property.toString()}`,
            {
                value: hint,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${HintMetadata.hintParams}${property.toString()}`,
            {
                value: params,
                configurable: false,
                enumerable: false,
            }
        );
    };
}

export class HintMetadata {
    public static hasHint = '__hasHint__';
    public static hint = '__hint__';
    public static hintParams = '__hintParams__';
}
