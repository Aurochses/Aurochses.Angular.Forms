import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayMetadata, HiddenMetadata, HintMetadata, PlaceHolderMetadata, ReadonlyMetadata } from '../decorators/display/metadata';
import { RangeMetadata } from '../decorators/validate/metadata';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-editor',
    template: `<date [formGroup]="formGroup"></date>`
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

            switch (typeof editorModel[this.name]) {
                case 'string':
                    this.model.type = 'text';
                    break;
                case 'boolean':
                    this.model.type = 'boolean';
                    break;
                case 'number':
                    this.model.type = 'number';
                    break;
                default:
                    break;
            }

            if (editorModel[this.name] instanceof Date) {
                this.model.type = 'calendar';
            }
            // make an instance to read the properties
            this.model.label = editorModel[`${DisplayMetadata.displayName}${this.name}`] || this.model.label || this.name;
            this.model.tooltip = editorModel[`${DisplayMetadata.displayDesc}${this.name}`] || this.model.tooltip || this.name;
            // render as range id there is a range definition
            if (editorModel[`${RangeMetadata.hasRangeFrom}${this.name}`]
                && Number(editorModel[`${RangeMetadata.hasRangeFrom}${this.name}`])) {
                this.model.fromValue = <number>editorModel[`${RangeMetadata.hasRangeFrom}${this.name}`];
                this.model.type = 'range';
            }
            if (editorModel[`${RangeMetadata.hasRangeTo}_${this.name}`] && Number(editorModel[`${RangeMetadata.hasRangeTo}${this.name}`])) {
                this.model.toValue = <number>editorModel[`${RangeMetadata.hasRangeTo}${this.name}`];
                this.model.type = 'range';
            }
            // placeholder
            if (editorModel[`${PlaceHolderMetadata.hasWatermark}${this.name}`]) {
                this.model.waterMark = editorModel[`${PlaceHolderMetadata.watermark}${this.name}`];
            }
            // templates
            if (editorModel[`${HintMetadata.hasHint}${this.name}`]) {
                this.model.type = (<string>editorModel[`${HintMetadata.hint}${this.name}`]).toLowerCase();
                if (editorModel[`${HintMetadata.hintParams}${this.name}`]) {
                    this.params = (<{ key: string, value: any }[]>editorModel[`${HintMetadata.hintParams}${this.name}`]);
                }
            }

            // render hidden fields as hidden even in forms
            if (editorModel[`${HiddenMetadata.isHidden}${this.name}`]) {
                this.model.type = 'hidden';
            }
            // check readonly
            if (editorModel[`${ReadonlyMetadata.isReadonly}${this.name}`]) {
                this.model.readonly = !!editorModel[`${ReadonlyMetadata.isReadonly}${this.name}`];
            }
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
