import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { getActionsModel } from '../decorators/actions.decorator';

import { ActionsModel } from '../models/actions.model';

import { FormService } from '../services/form.service';

@Component({
    selector: 'aur-form',
    templateUrl: './form.component.html'
})
export class FormComponent<T> implements OnChanges, OnInit {

    @Input() viewModel: T;
    @Input() component: Object;

    @Output() submitted = new EventEmitter<T>();
    @Output() canceled = new EventEmitter();

    formGroup: FormGroup;

    actions: ActionsModel;

    constructor(private formService: FormService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['viewModel'].firstChange) {
            this.formGroup.patchValue(this.viewModel);
        }
    }

    ngOnInit(): void {
        this.formGroup = this.formService.build(this.viewModel);

        this.actions = getActionsModel(this.viewModel);
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.submitted.emit(<T>this.formGroup.value);
        } else {
            this.validate(this.formGroup);
        }
    }

    private validate(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(
            key => {
                const control = formGroup.get(key);

                if (control instanceof FormControl) {
                    control.markAsTouched({ onlySelf: true });
                } else if (control instanceof FormGroup) {
                    this.validate(control);
                }
            }
        );
    }

    onCancel(): void {
        this.canceled.emit();
    }
}
