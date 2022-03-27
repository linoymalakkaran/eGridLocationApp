import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';
import { EGridDataService } from './services/egrid-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LocationMapComponent,
    LocationCardComponent,
    LocationFilterComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [EGridDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
