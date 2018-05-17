import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormComponent } from './components/form.component';
import { FormGroupComponent } from './components/form-group.component';
import { BooleanComponent } from './components/editors/boolean.component';
import { DateComponent } from './components/editors/date.component';
import { DropDownComponent } from './components/editors/dropdown.component';
import { StringComponent } from './components/editors/string.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { NumberComponent } from './components/editors/number.component';
import { TextComponent } from './components/editors/text.component';

import { AurFormService } from './services/form.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    declarations: [
        FormComponent,
        FormGroupComponent,
        BooleanComponent,
        DateComponent,
        DropDownComponent,
        StringComponent,
        HiddenComponent,
        NumberComponent,
        TextComponent
    ],
    providers: [
        AurFormService
    ],
    exports: [
        FormComponent
    ]
})

export class AurFormsModule { }
