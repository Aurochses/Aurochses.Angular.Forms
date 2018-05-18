export function DisplayGroup(name: string, order: number = 0, description?: string) {
    return function displayGroupInternal(target: Object, property: string | symbol): void {
        Object.defineProperty(
            target,
            `${DisplayGroupMetadata.isGrouped}${property.toString()}`,
            {
                value: true,
                configurable: false,
                enumerable: false
            }
        );

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

class DisplayGroupMetadata {
    public static isGrouped = '__isGrouped__';
    public static displayGroupName = `__groupName__`;
    public static displayGroupOrder = `__groupOrder__`;
    public static displayGroupDescription = `__groupDescription__`;
}
