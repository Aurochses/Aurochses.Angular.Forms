import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdInputModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AurochsesEditorComponent } from './components/aurochses-editor.component';
import { AurochsesFormComponent } from './components/aurochses-form.component';
import { AurochsesFormService } from './services/aurochses-form.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpModule,
        MdInputModule,
        MdSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AurochsesFormComponent
    ],
    declarations: [
        AurochsesFormComponent,
        AurochsesEditorComponent
    ],
    providers: [
        AurochsesFormService
    ]
})

export class AurochsesFormModule { }
