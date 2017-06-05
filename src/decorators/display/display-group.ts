import { DisplayGroupMetadata } from './metadata/display-group.metadata';

export function DisplayGroup(name: string, order: number = 0, description?: string) {
    return function displayGroupInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisplayGroupMetadata.isGrouped}${property.toString()}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupName}${property.toString()}`, {
            value: name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupOrder}${property.toString()}`, {
            value: parseInt(order.toString(), 10),
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupDesc}${property.toString()}`, {
            value: description,
            enumerable: false,
            configurable: false
        });
    };
}
