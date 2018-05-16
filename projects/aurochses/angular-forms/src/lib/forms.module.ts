import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormComponent } from './components/form.component';
import { BooleanComponent } from './components/editors/boolean.component';
import { DateComponent } from './components/editors/date.component';
import { DropDownComponent } from './components/editors/dropdown.component';
import { StringComponent } from './components/editors/string.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { NumberComponent } from './components/editors/number.component';
import { TextComponent } from './components/editors/text.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        FormComponent,
        BooleanComponent,
        DateComponent,
        DropDownComponent,
        StringComponent,
        HiddenComponent,
        NumberComponent,
        TextComponent
    ],
    exports: [
        FormComponent
    ]
})

export class AurFormsModule { }
