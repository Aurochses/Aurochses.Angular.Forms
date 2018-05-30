import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AurFormsModule } from '@aurochses/angular-forms';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    AurFormsModule
  ]
})
export class MainModule { }
