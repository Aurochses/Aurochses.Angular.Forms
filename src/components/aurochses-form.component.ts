import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DisplayGroupMetadata, DisplayMetadata, HiddenMetadata, ReadonlyMetadata } from '../decorators/display/metadata';
import { Display } from '../decorators/display/models/display.model';
import { RequiredMetadata } from '../decorators/validate/metadata';
import { ControlModel } from '../models/control.model';
import { AurochsesFormService } from '../services/aurochses-form.service';
import { CustomFormControl } from '../services/custom-form-control';

@Component({
    selector: 'aurochses-form',
    template: `<ng-container *ngFor="let control of controls" [ngSwitch]="control.type">
                    <hidden *ngSwitchCase="'hidden'" [formGroup]="formGroup" [control]="control"></hidden>
                    <date *ngSwitchCase="'date'" [formGroup]="formGroup" [control]="control"></date>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    controls: Array<ControlModel>;

    constructor() {
        this.controls = new Array<ControlModel>();
    }

    ngOnInit() {
        for (let name in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(name)) {
                let control = <CustomFormControl>this.formGroup.controls[name];
                if (control) {
                    let model: ControlModel = {
                        // isDisabled: false,
                        isReadonly: control.isReadonly,
                        // isRequired: this.control[`${RequiredMetadata.isRequired}${name}`],
                        key: control.display.order,
                        name: name,
                        placeholder: control.display.name,
                        type: control.type
                    };

                    this.controls.push(model);
                }
            }
        }

        this.controls.sort((e, n) => e.key - n.key);
    }
}
