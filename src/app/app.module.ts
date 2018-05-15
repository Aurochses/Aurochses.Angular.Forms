import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AurochsesFormModule } from 'angular-forms';

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
