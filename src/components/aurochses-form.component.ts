import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisplayGroupMetadata } from '../decorators/display-group.decorator';
import { DisplayMetadata } from '../decorators/display.decorator';
import { AurochsesFormService } from '../services/aurochses-form.service';

@Component({
    selector: 'aurochses-form',
    template: `<ng-content></ng-content>
               <ng-container *ngIf="!ungroupedAfter">
                   <aurochses-editor *ngFor="let editor of editors" [name]="editor.editor" [formGroup]="formGroup"></aurochses-editor>
               </ng-container>
               <ng-container *ngIf="grouped()">
                <fieldset *ngFor="let group of groups">
                    <legend [attr.title]="group.desc" *ngIf="group.name">{{ group.name }}</legend>
                    <aurochses-editor
                    *ngFor="let editor of group.editors"
                    [name]="editor.editor"
                    [formGroup]="formGroup"></aurochses-editor>
                </fieldset>
               </ng-container>
               <ng-container *ngIf="ungroupedAfter">
                   <aurochses-editor *ngFor="let editor of editors" [name]="editor.editor" [formGroup]="formGroup"></aurochses-editor>
               </ng-container>`
})

export class AurochsesFormComponent implements OnInit {

    @Input()
    formGroup: FormGroup;

    @Input()
    ungroupedAfter: boolean = true;

    editors: Array<{ key: number, editor: string }>;
    groups: Array<{ key: number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>;
    constructor() {
        this.editors = new Array<{ key: number, editor: string }>();
        this.groups = new Array<{ key: number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>();
    }

    ngOnInit() {
        for (let controlName in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(controlName)) {
                let displayOrder: number = 0;
                let groupOrder: number = 0;
                let groupName: string;
                let groupDesc: string;
                let isInGroup: boolean = false;

                let editorModel = (<any>this.formGroup)[`${AurochsesFormService.editorModel}`];

                if (editorModel) {
                    displayOrder = editorModel[`${DisplayMetadata.displayOrder}${controlName}`];
                    isInGroup = !!editorModel[`${DisplayGroupMetadata.isGrouped}${controlName}`];
                    if (isInGroup) {
                        groupName = editorModel[`${DisplayGroupMetadata.displayGroupName}${controlName}`];

                        if (!(this.groups.filter(g => g.name === groupName).length === 1)) {
                            this.groups.push({
                                key: editorModel[`${DisplayGroupMetadata.displayGroupOrder}${controlName}`],
                                name: groupName,
                                desc: editorModel[`${DisplayGroupMetadata.displayGroupDesc}${controlName}`],
                                editors: new Array<{ key: number, editor: string }>()
                            });
                        }

                        this.groups.filter(g => g.name === groupName)[0].editors.push({
                            key: displayOrder,
                            editor: controlName
                        });

                    }
                }
                if (!isInGroup) {
                    this.editors.push({
                        key: displayOrder,
                        editor: controlName
                    });
                }
            }
        }

        this.editors.sort((e, n) => e.key - n.key);
        this.groups.sort((e, n) => e.key - n.key);
    }

    public grouped(): boolean {
        return this.groups && this.groups.length > 0;
    }
}
