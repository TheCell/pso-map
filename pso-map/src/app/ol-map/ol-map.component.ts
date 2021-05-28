import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {View, Feature, Map, MapBrowserEvent } from 'ol';
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
import * as olInteraction from 'ol/interaction';
import { MapLocation } from './map-location';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements AfterViewInit {
  @Input() public center: Coordinate | undefined;
  @Input() public zoom: number | undefined;
  @Output() public mapLocation = new EventEmitter<MapLocation>();
  @Output() public addLocation = new EventEmitter<Coordinate>();
  @Output() public mapReady = new EventEmitter<Map>();

  extent: Extent = [0, 0, 2048, 2048];
  projection: Projection | undefined;
  psoLayer: ImageLayer | undefined;
  view: View | undefined;
  map: Map | undefined;
  diamondSymbols: VectorLayer | undefined;

  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    if (!this.map) {
      // this.zone.runOutsideAngular(() => this.initMap())
      this.initMap();
    } 

    // setTimeout(()=>this.mapReady.emit(this.Map));
    this.mapReady.emit(this.map);
  }

  private initMap(): void {
    this.projection = new Projection({
      code: 'pso-image',
      units: 'pixels',
      extent: this.extent,
    });

    this.view = new View({
      projection: this.projection,
      center: getCenter(this.extent),
      zoom: 2,
      maxZoom: 8
    });

    this.psoLayer = new ImageLayer({
      source: new Static({
        attributions: 'todo',
        url: '/assets/map/psoMap.png',
        projection: new Projection({
          code: 'psomap',
          units: 'pixels',
          extent: this.extent
        }),
        imageExtent: this.extent
      })
    });

    this.map = new Map({
      layers: [this.psoLayer],
      target: 'mapid',
      view: this.view
    });

    this.map.on('moveend', this.onMoveEnd.bind(this));
    this.map.on('dblclick', this.onDoubleClick.bind(this));
    const zoomInteraction = this.map.getInteractions().getArray().find((interaction) => interaction instanceof olInteraction.DoubleClickZoom );
    if (zoomInteraction) {
      this.map.removeInteraction(zoomInteraction);
    }

    this.addDiamonds();
  }

  private onMoveEnd(): void {
    const view = this.map?.getView();
    if (!view) {
      return;
    }

    const location: MapLocation = {
      center: view.getCenter() ?? [],
      zoom: view.getZoom() ?? 0,
      rotation: view.getRotation()
    };

    this.mapLocation.next(location);
  }

  private onDoubleClick(event: MapBrowserEvent): void {
    console.log('doubleclick', event.coordinate);
    const newFeature = new Feature(new Point(event.coordinate));
    newFeature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 16],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: '/assets/symbols/diamond.png'
      })
    }));
    this.diamondSymbols?.getSource().addFeature(newFeature);
    this.addLocation.emit(event.coordinate);
  }

  private addDiamonds(): void {
    if (!this.map) {
      return;
    }

    const diamonds = new Array<Feature>(100);
    const diamondStyle = new Style({
      image: new Icon({
        anchor: [0.5, 16],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: '/assets/symbols/diamond.png'
      })
    });
    
    for(let i = 0; i < 100; ++i) {
      const coordinates = [2048 * Math.random(), 2048 * Math.random()];
      diamonds[i] = new Feature(new Point(coordinates));
      diamonds[i].setStyle(diamondStyle);
    }

    const diamondVectorSource = new VectorSource({
      features: [...diamonds]
    });

    this.diamondSymbols = new VectorLayer({
      source: diamondVectorSource
    });

    this.map.addLayer(this.diamondSymbols);
  }
}