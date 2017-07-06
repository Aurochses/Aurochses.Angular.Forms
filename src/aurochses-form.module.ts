import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AurochsesFormComponent } from './components/aurochses-form.component';
import { DateComponent } from './components/editors/date.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { TextComponent } from './components/editors/text.component';
import { TextAreaComponent } from './components/editors/textarea.component';
import { AurochsesFormService } from './services/aurochses-form.service';

@NgModule({
    declarations: [
        DateComponent,
        TextComponent,
        TextAreaComponent,
        HiddenComponent,
        AurochsesFormComponent
    ],
    exports: [
        AurochsesFormComponent
    ],
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
    providers: [
        AurochsesFormService
    ]
})

export class AurochsesFormModule { }
