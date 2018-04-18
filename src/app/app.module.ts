import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AurochsesFormModule } from "../forms/aurochses-form.module";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AurochsesFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
