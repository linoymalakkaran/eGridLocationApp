import { Component, Input, OnInit } from '@angular/core';
import { IEgridModel } from '../models/IEgrid.interface';

@Component({
  selector: 'app-location-table-view',
  templateUrl: './location-table-view.component.html',
  styleUrls: ['./location-table-view.component.scss'],
})
export class LocationTableViewComponent implements OnInit {
  @Input()
  locDataList!: IEgridModel[];

  constructor() {}

  ngOnInit(): void {}

  mapMoveToPoint(locData: IEgridModel) {
    App.mapMoveToPoint(locData);
  }
}
