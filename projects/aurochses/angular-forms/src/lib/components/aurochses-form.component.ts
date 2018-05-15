import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DisplayGroupMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata/index';
import { Display } from '../decorators/display/models/display.model';
import { HintType } from '../decorators/display/models/hint.type';
import { RequiredMetadata } from '../decorators/validate/metadata/index';
import { CustomFormControl } from '../services/custom-form-control';
import { CustomFormGroup } from '../services/custom-form-group';
import { InputType } from '../services/input.type';

@Component({
    selector: 'aur-forms',
    template: `<ng-container *ngFor="let control of controls" [ngSwitch]="control.type">
                    <hidden *ngSwitchCase="inputType.hidden" [formGroup]="formGroup" [control]="control"></hidden>
                    <date *ngSwitchCase="inputType.date" [formGroup]="formGroup" [control]="control"></date>
                    <string *ngSwitchCase="inputType.string" [formGroup]="formGroup" [control]="control"></string>
                    <boolean *ngSwitchCase="inputType.boolean" [formGroup]="formGroup" [control]="control"></boolean>
                    <number *ngSwitchCase="inputType.number" [formGroup]="formGroup" [control]="control"></number>
                    <ng-container *ngSwitchCase="inputType.hint" [ngSwitch]="control.hint.type">
                        <dropdown *ngSwitchCase="hintType.dropdown"
                            [formGroup]="formGroup"
                            [control]="control"
                            [component]="component"></dropdown>
                        <text *ngSwitchCase="hintType.text" [formGroup]="formGroup" [control]="control"></text>
                    </ng-container>
                    <aur-forms *ngSwitchCase="inputType.object" [formGroup]="control"></aur-forms>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    @Input()
    component: Object;

    controls: Array<CustomFormControl | CustomFormGroup>;

    inputType = InputType;
    hintType = HintType;

    constructor() {
        this.controls = new Array<CustomFormControl | CustomFormGroup>();
    }

    ngOnInit() {
        for (const name in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(name)) {
                const control = <CustomFormControl | CustomFormGroup>this.formGroup.controls[name];
                this.controls.push(control);
            }
        }

        this.controls.sort((e, n) => e.key - n.key);
    }
}
