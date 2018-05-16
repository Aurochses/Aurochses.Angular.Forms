import { HintType } from '../models/hint.type';

export function Hint(type: HintType, params?: { key: {}, value: {} }[]) {
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
            `${HintMetadata.hintType}${property.toString()}`,
            {
                value: type,
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

export function hasHint<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${HintMetadata.hasHint}${property}`];
}

export function getHintModel<T>(instance: T, property: keyof T): { type: HintType, params: Array<{ key: string, value: string }> } | null {
    if (hasHint(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return {
            type: <HintType>prototype[`${HintMetadata.hintType}${property}`],
            params: prototype[`${HintMetadata.hintParams}${property}`]
        };
    }

    return null;
}

class HintMetadata {
    public static hasHint = '__hasHint__';
    public static hintType = '__hintType__';
    public static hintParams = '__hintParams__';
}
