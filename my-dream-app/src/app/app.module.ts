import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewBoxComponent } from './new-box/new-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NewBoxComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
