/**
 * The Template decorator.
 *
 * One can define the way a property gets rendered.
 * Currently supported:
 *  - TextArea
 *  - Calendar
 *  - Range
 *  - Number
 *  - Text
 *
 * The Calendar creates Date-fielsd. However, in casde of a datatype Date the date field will be created anyway.
 *
 * @param template        The Name that appears in form fields as a watermark.
 * @param params          Depending of template some additional values as a dictionary.
 */
export function Hint(template: string, params: { key: string, value: any }[]) {
    // the original decorator
    function hintInternal(target: Object, name: string): void {
        let hintMetadata = new HintMetadata(target, name, template, params);
    }
    // return the decorator
    return hintInternal;
}

export class HintMetadata {
    public static hint = '__hint__';
    public static hintParams = `__hintParams__`;
    public static hasHint = `__hasHint__`;
    constructor(public target: any, public key: string, public template: string, public params: { key: string, value: any }[]) {
        Object.defineProperty(this.target, `${HintMetadata.hint}${this.key}`, {
            value: this.template,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${HintMetadata.hintParams}${this.key}`, {
            value: this.params,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(this.target, `${HintMetadata.hasHint}${this.key}`, {
            value: true,
            enumerable: false,
            configurable: false
        });
    }
}
