import { Component, OnInit } from '@angular/core';
import { MapLocation } from '../ol-map/map-location';


@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrls: ['./test-map.component.scss']
})
export class TestMapComponent implements OnInit {

  constructor() {
   }

  public ngOnInit(): void {
    
  }

  public onMapReady(things: any): void {
    console.log('map ready', things);
  }

  public clickedEvent(info: any): void {
    console.log('clickedEvent', info);
  }

  public onCurrentLocation(location: MapLocation): void {
    // console.log(location);
  }
}
