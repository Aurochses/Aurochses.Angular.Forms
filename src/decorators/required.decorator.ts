export function Required(msg?: string) {
    // the original decorator
    function requiredInternal(target: Object, property: string | symbol): void {
        let requiredMetadata = new RequiredMetadata(target, property.toString(), msg);
    }

    // return the decorator
    return requiredInternal;
}

export class RequiredMetadata {

    public static isRequired = `__isRequired__`;
    public static errRequired = `__errRequired__`;

    constructor(public target: any, public key: string, public msg?: string) {
        Object.defineProperty(this.target, `${RequiredMetadata.isRequired}${this.key}`, {
            get: function () { return true; },
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${RequiredMetadata.errRequired}${this.key}`, {
            value: this.msg || `The field ${this.key} is required`,
            enumerable: false,
            configurable: false
        });
    }
}
