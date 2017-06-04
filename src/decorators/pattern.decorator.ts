/**
 * The decorator assures that a string field fullfilles a regular expression pattern.
 * 
 * @param pattern: The expression as RegExp.
 * @param msg: A custom message. 
 * 
 */
export function Pattern(pattern: RegExp, msg?: string) {
    // the original decorator
    function patternInternal(target: Object, property: string | symbol): void {
        let patternMetadata = new PatternMetadata(target, property.toString(), pattern, msg);
    }

    // return the decorator
    return patternInternal;
}

export class PatternMetadata {

    public static hasPattern = `__hasPattern__`;
    public static errPattern = `__errPattern__`;

    constructor(public target: any, public key: string, public reg: RegExp, public msg?: string) {


        // create a helper property to transport a meta data value
        Object.defineProperty(this.target, `${PatternMetadata.hasPattern}${key}`, {
            value: this.reg,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${PatternMetadata.errPattern}${key}`, {
            value: this.msg || `The field ${this.key} must fullfill the pattern ${this.reg}`,
            enumerable: false,
            configurable: false
        });
    }

}