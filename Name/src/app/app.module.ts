import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule, FormsModule,ReactiveFormsModule, RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
