import { NgModule } from '@angular/core';

import { AurFormsModule, AurFormService } from '@aurochses/angular-forms';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AurFormsModule
  ],
  providers: [
    AurFormService
  ]
})
export class MainModule { }
