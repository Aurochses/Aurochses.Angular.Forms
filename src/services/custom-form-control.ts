import { FormControl } from '@angular/forms';

/**
 * Extends the `FormControl` class to hold the validation message.
 */
export class CustomFormControl extends FormControl {
    /**
     * Set of messages in the form `{ "validation": "message" }.
     */
    messages: {};
}
