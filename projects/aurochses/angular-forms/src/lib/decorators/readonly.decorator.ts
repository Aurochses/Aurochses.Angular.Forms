export function Readonly(readonly = true) {
    return function readonlyInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${ReadonlyMetadata.readonly}${property.toString()}`,
            {
                value: readonly,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export class ReadonlyMetadata {
    public static readonly = '__readonly__';
}
