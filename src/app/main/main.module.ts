import { NgModule } from '@angular/core';

import { AurFormsModule, AurFormsService } from '@aurochses/angular-forms';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AurFormsModule
  ],
  providers: [
    AurFormsService
  ]
})
export class MainModule { }
