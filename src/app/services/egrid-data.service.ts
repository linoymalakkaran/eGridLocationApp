import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  defaultIApiResponse,
  IApiResponse,
} from '../models/IApiResponse.interface';
import { IEgridModel } from '../models/IEgrid.interface';

@Injectable({
  providedIn: 'root',
})
export class EGridDataService {
  public eGridData: IEgridModel[] = [];
  topTenPowerPlants: IEgridModel[] = [];
  powerPlantsUIList$: BehaviorSubject<IEgridModel[]> = new BehaviorSubject<
    IEgridModel[]
  >([]);

  constructor(private httpClient: HttpClient) {}

  GET_ICA_API_BASEURL = (): string => `${environment.baseApiUrl}`;

  getLocationData(): Observable<IEgridModel[]> {
    return this.httpClient
      .get<IApiResponse<IEgridModel[]>>(
        `${this.GET_ICA_API_BASEURL()}egrid-data`
      )
      .pipe(
        map((response: IApiResponse<IEgridModel[]>) => {
          const modifiedData: IEgridModel[] = [];
          response.data.forEach((item) => {
            item.PLNGENAN = item.PLNGENAN.replaceAll('(', '')
              .replaceAll(')', '')
              .replaceAll(',', '');
            modifiedData.push(item);
          });
          this.eGridData = modifiedData;
          return this.eGridData;
        }),
        catchError((err) => {
          console.log('getLocationData service error => ', err);
          return of([]);
        })
      );
  }

  setTopNAnnualNetGenerationOfPowerPlants(
    numberOfPlants: number = 10
  ): IEgridModel[] {
    this.topTenPowerPlants = [...this.eGridData]
      .sort((itemA, itemB) => {
        return parseFloat(itemA.PLNGENAN) - parseFloat(itemB.PLNGENAN);
      })
      .slice(0, numberOfPlants);
    this.initializeGoogleMap(this.topTenPowerPlants);
    this.powerPlantsUIList$.next(this.topTenPowerPlants);
    return this.topTenPowerPlants;
  }

  initializeGoogleMap(markers: any) {
    App.globals.MapPoints = markers;
    var latlng = new google.maps.LatLng(markers[0].LAT, markers[0].LON); // default location
    var myOptions = {
      zoom: 11,
      center: latlng,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    App.globals.locationMap = new google.maps.Map(
      document.getElementById('map_canvas'),
      myOptions
    );
    App.createMarkers();
    App.globals.locationMap.setCenter(latlng);
    App.globals.locationMap.setZoom(3);
  }

  getLocationDataByPlantName(plantName: string): IEgridModel | null {
    const matchingData = this.eGridData.filter((item) =>
      item.PNAME.includes(plantName)
    );
    const isDataFound = matchingData && matchingData.length > 0;
    if (isDataFound) {
      this.initializeGoogleMap([matchingData[0]]);
      this.powerPlantsUIList$.next(matchingData);
    }
    return isDataFound ? matchingData[0] : null;
  }

  resetMapWithFilterOptions(filterOption: any) {
    const matchingData = this.eGridData.filter((item) => {
      return (
        parseFloat(item.PLNGENAN) > filterOption.minVal &&
        parseFloat(item.PLNGENAN) < filterOption.maxVal
      );
    });
    const slicedData = matchingData.slice(0, 100);
    this.initializeGoogleMap(slicedData);
    this.powerPlantsUIList$.next(slicedData);
    return slicedData;
  }
}
