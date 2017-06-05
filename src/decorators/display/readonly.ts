import { ReadonlyMetadata } from './metadata/readonly.metadata';

export function Readonly(readonly = true) {
    return function readonlyInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${ReadonlyMetadata.isReadonly}${property.toString()}`, {
            value: readonly,
            enumerable: false,
            configurable: false
        });
    };
}
