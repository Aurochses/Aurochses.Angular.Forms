import { PatternMetadata } from "./pattern.decorator";
/**
 * Validates a field against an email pattern.
 * Based on "pattern", so in form one must use hasError('pattern') to get validation results.
 *
 * @param msg: A custom message. If not provided "The field ffff must contain a valid e-mail address." 
 *             will be generated, while ffff is the property name.
 *
 */
export function Email(msg?: string) {
    // the original decorator
    let pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    function emailInternal(target: Object, property: string | symbol): void {
        let emailMetadata = new PatternMetadata(target, property.toString(), pattern, msg || `The field ${property.toString()} must contain a valid e-mail address.`);
    }
    // return the decorator
    return emailInternal;
}
