import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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
}
