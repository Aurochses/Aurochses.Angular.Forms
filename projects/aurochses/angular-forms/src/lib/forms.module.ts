import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormComponent } from './components/form.component';
import { FormGroupComponent } from './components/form-group.component';
import { BooleanComponent } from './components/editors/boolean.component';
import { DateComponent } from './components/editors/date.component';
import { DropdownComponent } from './components/editors/dropdown.component';
import { StringComponent } from './components/editors/string.component';
import { HiddenComponent } from './components/editors/hidden.component';
import { NumberComponent } from './components/editors/number.component';
import { TextareaComponent } from './components/editors/textarea.component';

import { FormService } from './services/form.service';

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
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    declarations: [
        FormComponent,
        FormGroupComponent,
        BooleanComponent,
        DateComponent,
        DropdownComponent,
        StringComponent,
        HiddenComponent,
        NumberComponent,
        TextareaComponent
    ],
    providers: [
        FormService
    ],
    exports: [
        FormComponent
    ]
})

export class AurFormsModule { }
