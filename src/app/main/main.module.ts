import { NgModule } from '@angular/core';

import { AurFormsModule } from '@aurochses/angular-forms';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AurFormsModule
  ]
})
export class MainModule { }
