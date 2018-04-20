import { DisplayGroupMetadata } from './metadata/display-group.metadata';

export function DisplayGroup(name: string, order: number = 0, description?: string) {
    return function displayGroupInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(target, `${DisplayGroupMetadata.isGrouped}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: true
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupName}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: name
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupOrder}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: parseInt(order.toString(), 10)
        });

        Object.defineProperty(target, `${DisplayGroupMetadata.displayGroupDesc}${property.toString()}`, {
            configurable: false,
            enumerable: false,
            value: description
        });
    };
}
