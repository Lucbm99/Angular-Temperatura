import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/form-field';
import { MatInputModule } from '@angular/input';

import { AppComponent } from './app.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperaturaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
