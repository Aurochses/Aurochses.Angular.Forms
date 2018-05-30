import { NgModule } from '@angular/core';

import { AurFormsModule } from '@aurochses/angular-forms';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AurFormsModule,
    HttpClientModule
  ]
})
export class MainModule { }
