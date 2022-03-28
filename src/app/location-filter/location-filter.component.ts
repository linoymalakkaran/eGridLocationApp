import { Component, OnInit } from '@angular/core';
import { EGridDataService } from '../services/egrid-data.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent implements OnInit {
  filterOptions: any[] = [];

  constructor(private eGridDataService: EGridDataService) {}

  ngOnInit(): void {
    this.filterOptions = [
      {
        width: 27,
        height: 27,
        matrix: 'matrix(1,0,0,1,13.5,13.5)',
        radius: '12.676190476190502',
        strokeWidth: '1.3333333333333333',
        label: '> 6,000',
        minVal: 6000,
        maxVal: 10000000000,
      },
      {
        width: 22,
        height: 22,
        matrix: 'matrix(1,0,0,1,11,11)',
        radius: '10.09785088363442',
        strokeWidth: '1.3333333333333333',
        label: '3,000 - 6,000',
        minVal: 3000,
        maxVal: 6000,
      },
      {
        width: 18,
        height: 18,
        matrix: 'matrix(1,0,0,1,9,9)',
        radius: '7.959924189972672',
        strokeWidth: '1.3333333333333333',
        label: '1,000 - 3,000',
        minVal: 1000,
        maxVal: 3000,
      },
      {
        width: 13,
        height: 13,
        matrix: 'matrix(1,0,0,1,6.5,6.5)',
        radius: '5.821997496310918',
        strokeWidth: '1.3333333333333333',
        label: '< 1,000',
        minVal: 0,
        maxVal: 1000,
      },
    ];
  }

  resetMap() {
    this.clearFilterOptions();
    this.eGridDataService.setTopNAnnualNetGenerationOfPowerPlants();
  }

  selectFilter(filterOption: any) {
    this.filterOptions.forEach((filter) => {
      filter.strokeWidth = '1.3333333333333333';
      if (filterOption.width === filter.width) {
        filter.strokeWidth = filterOption.width;
      }
    });
    this.eGridDataService.resetMapWithFilterOptions(filterOption);
  }

  clearFilterOptions() {
    this.filterOptions.forEach((filter) => {
      filter.strokeWidth = '1.3333333333333333';
    });
  }
}
