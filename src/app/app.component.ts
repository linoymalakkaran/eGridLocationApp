import { Component, OnInit } from '@angular/core';
import { IEgridModel } from './models/IEgrid.interface';
import { IScriptsModel } from './models/IScripts-model';
import { EGridDataService } from './services/egrid-data.service';
import { ScriptLoaderService } from './services/script-loader.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public eGridData: IEgridModel[] = [];
  iacScriptsModel: IScriptsModel[] = [
    {
      name: 'locations',
      type: 'js',
      src: `./assets/js/locations.js`,
      loaded: false,
    },
    {
      name: 'map',
      type: 'js',
      src: `./assets/js/map.js`,
      loaded: false,
    },
  ];
  topTenPowerPlants: IEgridModel[] = [];

  constructor(
    private eGridDataService: EGridDataService,
    public scriptLoaderService: ScriptLoaderService
  ) {}

  ngOnInit(): void {
    this.scriptLoaderService.load(this.iacScriptsModel).then((scriptLoaded) => {
      this.iacScriptsModel.forEach((scriptObj) => {
        scriptObj.loaded = true;
      });
      this.getLocationData();
    });

    this.eGridDataService.powerPlantsUIList$.subscribe((topTenPowerPlants) => {
      this.topTenPowerPlants = topTenPowerPlants;
    });
  }

  getLocationData() {
    this.eGridDataService.getLocationData().subscribe({
      next: (locationData: IEgridModel[]) => {
        this.eGridData = locationData;
        this.eGridDataService.setTopNAnnualNetGenerationOfPowerPlants();
      },
      error: (e) => console.error(e),
    });
  }
}
