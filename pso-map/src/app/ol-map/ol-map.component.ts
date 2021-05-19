import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {View, Feature, Map } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
// import proj4 from 'proj4';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj'
import {coordinateRelationship, Extent} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements  AfterViewInit {
  @Input() public center: Coordinate | undefined;
  @Input() public zoom: number | undefined;

  view: View | undefined;
  projection: Projection | undefined;
  extent: Extent = [-20026376.39, -20048966.10, 20026376.39, 20048966.10];
  Map: Map | undefined;
  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) { }


  ngAfterViewInit():void {
    if (!this.Map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
    setTimeout(()=>this.mapReady.emit(this.Map));
  }

  private initMap(): void{
    // proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
    // register(proj4)
    this.projection = GetProjection('EPSG:3857');
    this.projection.setExtent(this.extent);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection,
    });
    this.Map = new Map({
      layers: [new TileLayer({
        source: new OSM({})
      })],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }
}
