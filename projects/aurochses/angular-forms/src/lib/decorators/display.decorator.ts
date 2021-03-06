import { DisplayModel } from '../models/display.model';

class DisplayMetadata {
    public static displayName = `__displayName__`;
    public static displayOrder = `__displayOrder__`;
    public static displayDescription = `__displayDescription__`;
    public static displayPrefix = `__displayPrefix__`;
    public static displaySuffix = `__displaySuffix__`;
}

export function Display(name: string, order: number = 0, description?: string, prefix?: string, suffix?: string) {
    return function displayInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DisplayMetadata.displayName}${property.toString()}`,
            {
                value: name,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayMetadata.displayOrder}${property.toString()}`,
            {
                value: parseInt(order.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayMetadata.displayDescription}${property.toString()}`,
            {
                value: description,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayMetadata.displayPrefix}${property.toString()}`,
            {
                value: prefix,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayMetadata.displaySuffix}${property.toString()}`,
            {
                value: suffix,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function getDisplayModel<T>(instance: T, property: keyof T): DisplayModel {
    const prototype = Object.getPrototypeOf(instance);

    const model = new DisplayModel();

    if (`${DisplayMetadata.displayName}${property}` in prototype) {
        model.name = prototype[`${DisplayMetadata.displayName}${property}`];
    } else {
        model.name = property.toString();
    }

    if (`${DisplayMetadata.displayOrder}${property}` in prototype) {
        model.order = parseInt(prototype[`${DisplayMetadata.displayOrder}${property}`], 10);
    }

    if (`${DisplayMetadata.displayDescription}${property}` in prototype) {
        model.description = prototype[`${DisplayMetadata.displayDescription}${property}`];
    }

    if (`${DisplayMetadata.displayPrefix}${property}` in prototype) {
        model.prefix = prototype[`${DisplayMetadata.displayPrefix}${property}`];
    }

    if (`${DisplayMetadata.displaySuffix}${property}` in prototype) {
        model.suffix = prototype[`${DisplayMetadata.displaySuffix}${property}`];
    }

    return model;
}
