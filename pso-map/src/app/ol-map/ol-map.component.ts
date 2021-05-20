import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {View, Feature, Map } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
// import proj4 from 'proj4';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj'
import {coordinateRelationship, Extent, getCenter} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import TileSource from 'ol/source/Tile';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';

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
  exampleLayer: TileLayer | undefined;
  psoLayer: ImageLayer | undefined;
  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) { }


  ngAfterViewInit():void {
    if (!this.Map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
    setTimeout(()=>this.mapReady.emit(this.Map));
  }

  private initMap(): void{
    this.exampleLayer = new TileLayer({
      source: new OSM({})
    });

    this.psoLayer = new ImageLayer({
      source: new Static({
        url: 'http://localhost:4200/assets/map/pso_largemap_optimised.png',
        projection: new Projection({
          code: 'psomap',
          units: 'pixels',
          extent: [0, 0, 12288, 12288]
        })
      })
    })

    this.projection = GetProjection('EPSG:3857');
    this.projection.setExtent(this.extent);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection,
    });
    // this.view = new View({
    //   center: getCenter([0, 0, 12288, 12288]),
    //   zoom: 2,
    //   projection: new Projection({
    //     code: 'psomap',
    //     units: 'pixels',
    //     extent: [0, 0, 12288, 12288]
    //   }),
    // });

    this.Map = new Map({
      layers: [this.exampleLayer],
      target: 'mapid',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }
}
