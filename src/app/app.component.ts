import { Component, OnInit } from '@angular/core';
import {
  defaultIApiResponse,
  IApiResponse,
} from './models/IApiResponse.interface';
import { IEgridModel } from './models/IEgrid.interface';
import { EGridDataService } from './services/egrid-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public eGridData: IEgridModel[] = [];

  constructor(private eGridDataService: EGridDataService) {}
  ngOnInit(): void {
    this.getLocationData();
  }

  getLocationData() {
    this.eGridDataService.getLocationData().subscribe({
      next: (locationData: IApiResponse<IEgridModel[]>) => {
        this.eGridData = locationData.data;
        console.log(this.eGridData);
      },
      error: (e) => console.error(e),
    });
  }
}
