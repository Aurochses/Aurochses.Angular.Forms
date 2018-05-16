import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AurFormControl } from '../../models/form-control.model';
import { MessageModel } from '../../models/message.model';

@Component({
    selector: 'aur-text',
    templateUrl: './text.component.html'
})

export class TextComponent {

    @Input()
    formGroup: FormGroup;

    @Input()
    control: AurFormControl;

    message(): string {
        return (<AurFormControl>this.formGroup.controls[this.control.name]).messages
            .filter((message: MessageModel) => this.formGroup.controls[this.control.name].hasError(message.type))
            .map((message: MessageModel) => message.text)[0];
    }
}
