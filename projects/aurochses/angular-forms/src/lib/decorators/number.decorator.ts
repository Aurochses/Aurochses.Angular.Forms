class NumberMetadata {
    public static hasNumber = '__hasNumber__';
    public static numberStep = '__numberStep__';
}

export function Number(step: number = 1) {
    return function numberInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${NumberMetadata.hasNumber}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${NumberMetadata.numberStep}${property.toString()}`,
            {
                value: step,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function hasNumber<T>(instance: T, property: keyof T): boolean {
    const prototype = Object.getPrototypeOf(instance);

    return !!prototype[`${NumberMetadata.hasNumber}${property}`];
}

export function getNumberStep<T>(instance: T, property: keyof T): number {
    if (hasNumber(instance, property)) {
        const prototype = Object.getPrototypeOf(instance);

        return prototype[`${NumberMetadata.numberStep}${property}`];
    }

    return undefined;
}
