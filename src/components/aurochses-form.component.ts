import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DisplayGroupMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata';
import { Display } from '../decorators/display/models/display.model';
import { RequiredMetadata } from '../decorators/validate/metadata';
import { AurochsesFormService } from '../services/aurochses-form.service';
import { CustomFormControl } from '../services/custom-form-control';
import { CustomFormGroup } from '../services/custom-form-group';
import { InputType } from '../services/input.type';

@Component({
    selector: 'aurochses-form',
    template: `<ng-container *ngFor="let control of controls" [ngSwitch]="control.type">
                    <hidden *ngSwitchCase="inputType.hidden" [formGroup]="formGroup" [control]="control"></hidden>
                    <date *ngSwitchCase="inputType.date" [formGroup]="formGroup" [control]="control"></date>
                    <text *ngSwitchCase="inputType.text" [formGroup]="formGroup" [control]="control"></text>
                    <textarea *ngSwitchCase="inputType.textarea" [formGroup]="formGroup" [control]="control"></textarea>
                    <boolean *ngSwitchCase="inputType.boolean" [formGroup]="formGroup" [control]="control"></boolean>
                    <number *ngSwitchCase="inputType.number" [formGroup]="formGroup" [control]="control"></number>
                    <aurochses-form *ngSwitchCase="inputType.object" [formGroup]="control"></aurochses-form>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    controls: Array<CustomFormControl | CustomFormGroup>;

    inputType = InputType;

    constructor() {
        this.controls = new Array<CustomFormControl | CustomFormGroup>();
    }

    ngOnInit() {
        for (let name in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(name)) {
                let control = <CustomFormControl | CustomFormGroup>this.formGroup.controls[name];
                this.controls.push(control);
            }
        }

        this.controls.sort((e, n) => e.key - n.key);
    }
}
