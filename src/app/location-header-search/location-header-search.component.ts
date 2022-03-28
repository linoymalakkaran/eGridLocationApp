import { Component, OnInit } from '@angular/core';
import { EGridDataService } from '../services/egrid-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location-header-search',
  templateUrl: './location-header-search.component.html',
  styleUrls: ['./location-header-search.component.scss'],
})
export class LocationHeaderSearchComponent implements OnInit {
  plantName: string = '';

  constructor(
    private eGridDataService: EGridDataService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  searchByPlantName() {
    if (this.plantName) {
      this.spinner.show();
      const searchResult = this.eGridDataService.getLocationDataByPlantName(
        this.plantName
      );
      if (searchResult) {
        App.mapMoveToPoint(searchResult);
        this.eGridDataService.clearFilter$.next(new Date().toString());
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      } else {
        this.spinner.hide();
        this.toastr.warning("Search data didn't match with any plant name.");
      }
    } else {
      this.toastr.error('Please enter plant name.');
    }
  }

  //reset list when search empty
  modelChangeFn(searchVal: any): void {
    if (!searchVal) {
      this.spinner.show();
      this.eGridDataService.setTopNAnnualNetGenerationOfPowerPlants();
      this.eGridDataService.clearFilter$.next(new Date().toString());
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }
}
