import { DisabledMetadata } from './metadata/disabled.metadata';

export function Disabled(disabled = true) {
    return function disabledInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisabledMetadata.isDisabled}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: disabled
        });
    };
}
