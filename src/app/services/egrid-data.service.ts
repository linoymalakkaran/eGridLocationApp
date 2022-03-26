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
  public eGridData: IApiResponse<IEgridModel[]> = defaultIApiResponse;

  constructor(private httpClient: HttpClient) {}

  GET_ICA_API_BASEURL = (): string => `${environment.baseApiUrl}`;

  getLocationData(): Observable<IApiResponse<IEgridModel[]>> {
    return this.httpClient
      .get<IApiResponse<IEgridModel[]>>(
        `${this.GET_ICA_API_BASEURL()}egrid-data`
      )
      .pipe(
        map((response: IApiResponse<IEgridModel[]>) => {
          this.eGridData = response;
          return this.eGridData;
        }),
        catchError((err) => {
          console.log('getLocationData service error => ', err);
          return of({
            data: [],
            message: 'error',
          } as IApiResponse<IEgridModel[]>);
        })
      );
  }
}
