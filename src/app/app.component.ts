import { Component, OnInit } from '@angular/core';
import {
  defaultIApiResponse,
  IApiResponse,
} from './models/IApiResponse.interface';
import { IEgridModel } from './models/IEgrid.interface';
import { IScriptsModel } from './models/IScripts-model';
import { EGridDataService } from './services/egrid-data.service';
import { ScriptLoaderService } from './services/script-loader.service';

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
  }

  getLocationData() {
    this.eGridDataService.getLocationData().subscribe({
      next: (locationData: IEgridModel[]) => {
        this.eGridData = locationData;
        this.setTopTenAnnualNetGenerationOfPowerPlants();
      },
      error: (e) => console.error(e),
    });
  }

  setTopTenAnnualNetGenerationOfPowerPlants() {
    this.topTenPowerPlants = [...this.eGridData]
      .sort((itemA, itemB) => {
        return parseFloat(itemA.PLNGENAN) - parseFloat(itemB.PLNGENAN);
      })
      .slice(0, 10);
  }
}
