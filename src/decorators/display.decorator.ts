/**
 * The Display decorator.
 * @param name          The Name or Label that appears in forms or as header in grids.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the element's order.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
        let displayMetadata = new DisplayMetadata(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayInternal;
}

export class DisplayMetadata {
    public static prefix = '__display';
    public static displayName = `${DisplayMetadata.prefix}Name__`;
    public static displayOrder = `${DisplayMetadata.prefix}Order__`;
    public static displayDesc = `${DisplayMetadata.prefix}Desc__`;


    constructor(public target: any, public key: string, public name: string, public order: number, public description?: string) {

        Object.defineProperty(this.target, `${DisplayMetadata.displayName}${this.key}`, {
            value: this.name,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${DisplayMetadata.displayOrder}${this.key}`, {
            value: parseInt(this.order.toString()),
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${DisplayMetadata.displayDesc}${this.key}`, {
            value: this.description,
            enumerable: false,
            configurable: false
        });
    }

}
