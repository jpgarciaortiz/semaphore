import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodeInputModule } from 'angular-code-input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TlightsComponent } from './tlights/tlights.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TlightsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CodeInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
