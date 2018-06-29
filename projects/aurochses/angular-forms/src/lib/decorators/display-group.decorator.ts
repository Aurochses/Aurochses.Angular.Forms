import { DisplayGroupModel } from '../models/display-group.model';

class DisplayGroupMetadata {
    public static displayGroupName = `__groupName__`;
    public static displayGroupOrder = `__groupOrder__`;
    public static displayGroupDescription = `__groupDescription__`;
}

export function DisplayGroup(name: string, order: number = 0, description?: string) {
    return function displayGroupInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DisplayGroupMetadata.displayGroupName}${property.toString()}`,
            {
                value: name,
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayGroupMetadata.displayGroupOrder}${property.toString()}`,
            {
                value: parseInt(order.toString(), 10),
                configurable: false,
                enumerable: false
            }
        );

        Object.defineProperty(
            target,
            `${DisplayGroupMetadata.displayGroupDescription}${property.toString()}`,
            {
                value: description,
                configurable: false,
                enumerable: false
            }
        );
    };
}

export function getDisplayGroupModel<T>(instance: T, property: keyof T): DisplayGroupModel {
    const prototype = Object.getPrototypeOf(instance);

    const model = new DisplayGroupModel();

    if (`${DisplayGroupMetadata.displayGroupName}${property}` in prototype) {
        model.name = prototype[`${DisplayGroupMetadata.displayGroupName}${property}`];
    } else {
        model.name = property.toString();
    }

    if (`${DisplayGroupMetadata.displayGroupOrder}${property}` in prototype) {
        model.order = parseInt(prototype[`${DisplayGroupMetadata.displayGroupOrder}${property}`], 10);
    }

    if (`${DisplayGroupMetadata.displayGroupDescription}${property}` in prototype) {
        model.description = prototype[`${DisplayGroupMetadata.displayGroupDescription}${property}`];
    }

    return model;
}
