import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayMetadata } from '../decorators/display.decorator';
import { HintMetadata } from '../decorators/hint.decorator';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-editor',
    template: `<textarea *ngIf="model.type == 'textarea'" [id]="name" [readOnly]='model.readonly'
                          [formControlName]="name" [attr.rows]="getParams('rows')" [attr.cols]="getParams('cols')">
                </textarea>
                <md-select *ngIf="model.type == 'enum'" [id]="name" placeholder="{{model.label}}" [formControlName]="name">
                    <md-option *ngFor="let option of enumValues" [value]="option.key">
                    {{option.val}}
                    </md-option>
                </md-select>
                <md-input-container [formGroup]="formGroup">
                    <input mdInput placeholder="{{model.label}}" type="{{model.type}}">
                </md-input-container>
                <span class="fa fa-warning text-danger form-control-feedback"
                      [hidden]="formGroup.controls[name].valid || formGroup.controls[name].pristine"></span>
                <small class="text-danger"
                       [hidden]="formGroup.controls[name].valid || formGroup.controls[name].pristine">
                  <span *ngFor="let error of errors">{{ formGroup.controls[name].messages[error] }}</span>
                </small>
                <div [formGroup]="formGroup">
                <input *ngIf="model.type == 'hidden'" [id]="name" [formControlName]="name" type="hidden" />
                </div>`
})
export class AurochsesEditorComponent implements OnInit {

    @Input()
    name: string;

    @Input()
    formGroup: FormGroup;

    @Output()
    @Input()
    value: any;

    model: EditorModel;

    params: { key: string, value: any }[];

    errors: Array<string>;

    constructor() {
        this.params = new Array<{ key: string, value: any }>();
        this.model = new EditorModel();
    }

    getParams(key: string): any {
        return this.first(this.params.filter((e) => e.key === key), 0);
    }

    first(array: Array<{ key: string, value: any }>, n: number): any {
        if (array == null) {
            return void 0;
        }

        if (n == null) {
            return array[0];
        }

        if (n < 0) {
            return [];
        }

        return array.slice(0, n);
    }

    ngOnInit() {

        this.formGroup.valueChanges.subscribe(data => this.onValueChanged(data));
        // this is set by FormValidatorService
        let editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];
        // get type from form
        if (editorModel) {
            // get elementary types, this might get overwritten later according to decorators found
            if (typeof editorModel[this.name] === 'string') {
                this.model.type = 'text';
            }
            if (typeof editorModel[this.name] === 'boolean') {
                this.model.type = 'boolean';
            }
            if (typeof editorModel[this.name] === 'number') {
                this.model.type = 'number';
            }
            if (editorModel[this.name] instanceof Date) {
                this.model.type = 'calendar';
            }
            // make an instance to read the properties
            this.model.label = editorModel[`${DisplayMetadata.displayName}${this.name}`] || this.model.label || this.name;
            this.model.tooltip = editorModel[`${DisplayMetadata.displayDesc}${this.name}`] || this.model.tooltip || this.name;
            // render as range id there is a range definition
            // if (editorModel[`__hasRangeFrom__${this.name}`] && Number(editorModel[`__hasRangeFrom__${this.name}`])) {
            //     this.fromValue = <number>editorModel[`__hasRangeFrom__${this.name}`];
            //     this.type = 'range';
            // }
            // if (editorModel[`__hasRangeTo__${this.name}`] && Number(editorModel[`__hasRangeTo__${this.name}`])) {
            //     this.toValue = <number>editorModel[`__hasRangeTo__${this.name}`];
            //     this.type = 'range';
            // }
            // // placeholder
            // if (editorModel[`__hasWatermark__${this.name}`]) {
            //     this.waterMark = editorModel[`__watermark__${this.name}`];
            // }
            // templates
            if (editorModel[`${HintMetadata.hasHint}${this.name}`]) {
                this.model.type = (<string>editorModel[`${HintMetadata.hint}${this.name}`]).toLowerCase();
                if (editorModel[`${HintMetadata.hintParams}${this.name}`]) {
                    this.params = (<{ key: string, value: any }[]>editorModel[`${HintMetadata.hintParams}${this.name}`]);
                }
            }

            // // render hidden fields as hidden even in forms
            // if (editorModel[`__isHidden__${this.name}`]) {
            //     this.type = 'hidden';
            // }
            // // check readonly
            // if (editorModel[`__isReadonly__${this.name}`]) {
            //     this.readonly = !!editorModel[`__isReadonly__${this.name}`];
            // }
        }
    }

    private onValueChanged(data: any) {
        // check validation on change
        this.errors = new Array<string>();
        let errors = this.formGroup.controls[`${this.name}`].errors;
        if (errors != null) {
            for (let error in errors) {
                if (errors.hasOwnProperty(error)) {
                    this.errors.push(error);
                }
            }
        }
    }
}


export class EditorModel {
    type: string = 'text';
    label: string;
    tooltip: string;
    inline: boolean = true;
    enumValues: any;
    fromValue: number = 0;
    toValue: number = 100;
    waterMark = '';
    readonly: boolean = false;
}