/**
 * The DisplayGroup decorator. Groups fields in auto forms.
 *
 * @param name          The Name or Label that appears in forms as the groups legend.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the groups order.
 * @param description   A tooltip that can be used optionally.
 */
export function DisplayGroup(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayGroupInternal(target: Object, property: string | symbol): void {
        let displayGroupMetadata = new DisplayGroupMetadata(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayGroupInternal;
}

export class DisplayGroupMetadata {

    public static prefix = '__group';
    public static isGrouped = '__isGrouped__';
    public static displayGroupName = `${DisplayGroupMetadata.prefix}Name__`;
    public static displayGroupOrder = `${DisplayGroupMetadata.prefix}Order__`;
    public static displayGroupDesc = `${DisplayGroupMetadata.prefix}Desc__`;

    constructor(public target: any, public key: string, public name: string, public order: number, public description?: string) {

        this.order = parseInt(this.order.toString());
        // create a helper property to transport a meta data value

        Object.defineProperty(this.target, `${DisplayGroupMetadata.isGrouped}${this.key}`, {
            value: true,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${DisplayGroupMetadata.displayGroupName}${this.key}`, {
            value: this.name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${DisplayGroupMetadata.displayGroupOrder}${this.key}`, {
            value: this.order,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${DisplayGroupMetadata.displayGroupDesc}${this.key}`, {
            value: this.description,
            enumerable: false,
            configurable: false
        });
    }

}
