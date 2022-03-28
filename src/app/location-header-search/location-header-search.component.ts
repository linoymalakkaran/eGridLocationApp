import { Component, OnInit } from '@angular/core';
import { EGridDataService } from '../services/egrid-data.service';

@Component({
  selector: 'app-location-header-search',
  templateUrl: './location-header-search.component.html',
  styleUrls: ['./location-header-search.component.scss'],
})
export class LocationHeaderSearchComponent implements OnInit {
  plantName: string = '';

  constructor(private eGridDataService: EGridDataService) {}

  ngOnInit(): void {}

  searchByPlantName() {
    if (this.plantName) {
      const searchResult = this.eGridDataService.getLocationDataByPlantName(
        this.plantName
      );
      if (searchResult) {
        App.mapMoveToPoint(searchResult);
      } else {
        alert("Search data didn't match with any plant name.");
      }
    } else {
      alert('Please enter plant name.');
    }
  }

  modelChangeFn(searchVal: any): void {
    if (!searchVal) {
      this.eGridDataService.setTopNAnnualNetGenerationOfPowerPlants();
    }
  }
}
