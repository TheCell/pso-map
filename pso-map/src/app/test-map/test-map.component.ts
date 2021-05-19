import { Component, OnInit } from '@angular/core';


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
}
