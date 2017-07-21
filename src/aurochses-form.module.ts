import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdCheckboxModule, MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AurochsesFormComponent } from './components/aurochses-form.component';
import { BooleanComponent } from './components/editors/boolean.component';
import { DateComponent } from './components/editors/date.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { NumberComponent } from './components/editors/number.component';
import { TextComponent } from './components/editors/text.component';
import { TextAreaComponent } from './components/editors/textarea.component';
import { AurochsesFormService } from './services/aurochses-form.service';

@NgModule({
    declarations: [
        BooleanComponent,
        DateComponent,
        TextComponent,
        TextAreaComponent,
        HiddenComponent,
        NumberComponent,
        AurochsesFormComponent
    ],
    exports: [
        AurochsesFormComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpModule,
        MdCheckboxModule,
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
