import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AurochsesFormComponent } from './components/aurochses-form.component';
import { BooleanComponent } from './components/editors/boolean.component';
import { DateComponent } from './components/editors/date.component';
import { DropDownComponent } from './components/editors/dropdown.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { NumberComponent } from './components/editors/number.component';
import { StringComponent } from './components/editors/string.component';
import { TextComponent } from './components/editors/text.component';
import { AurochsesFormService } from './services/aurochses-form.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        BooleanComponent,
        DateComponent,
        DropDownComponent,
        StringComponent,
        TextComponent,
        HiddenComponent,
        NumberComponent,
        AurochsesFormComponent
    ],
    providers: [
        AurochsesFormService
    ],
    exports: [
        AurochsesFormComponent
    ]
})

export class AurFormsModule { }
