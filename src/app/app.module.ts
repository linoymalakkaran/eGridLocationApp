import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';
import { EGridDataService } from './services/egrid-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationHeaderSearchComponent } from './location-header-search/location-header-search.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { LocationTableViewComponent } from './location-table-view/location-table-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationMapComponent,
    LocationCardComponent,
    LocationFilterComponent,
    LocationHeaderSearchComponent,
    LocationTableViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [EGridDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
