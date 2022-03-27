import { Component, Input, OnInit } from '@angular/core';
import { IEgridModel } from '../models/IEgrid.interface';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit {
  @Input()
  locData!: Partial<IEgridModel>;

  constructor() {}

  ngOnInit(): void {}


  mapMoveToPoint($event: MouseEvent) {
    App.mapMoveToPoint(this.locData);
  }
}
