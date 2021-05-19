import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestMapComponent } from './test-map/test-map.component';
import { OlMapComponent } from './ol-map/ol-map.component';

@NgModule({
  declarations: [
    AppComponent,
    TestMapComponent,
    OlMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
