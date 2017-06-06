import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AurochsesEditorComponent } from './components/aurochses-editor.component';
import { AurochsesFormComponent } from './components/aurochses-form.component';
import { DateComponent } from './components/editors/date.component';
import { AurochsesFormService } from './services/aurochses-form.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpModule,
        MdDatepickerModule,
        MdInputModule,
        MdNativeDateModule,
        MdSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AurochsesFormComponent
    ],
    declarations: [
        DateComponent,
        AurochsesFormComponent,
        AurochsesEditorComponent
    ],
    providers: [
        AurochsesFormService
    ]
})

export class AurochsesFormModule { }
