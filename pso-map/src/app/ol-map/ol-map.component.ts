import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
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
import {Fill, Icon, Style} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorSource from 'ol/source/Vector';
import { mapFeature } from '../api/mapFeature';
import CircleStyle from 'ol/style/Circle';
import { featureType } from '../api/FeatureType';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements AfterViewInit, OnChanges {
  @Input() public center: Coordinate | undefined;
  @Input() public zoom: number | undefined;
  @Input() public mapFeatures: Array<mapFeature> = [];
  @Input() public featureTypes: Array<featureType> = [];
  @Input() public selectedFeatureType = 0;
  @Output() public mapLocation = new EventEmitter<MapLocation>();
  @Output() public addLocation = new EventEmitter<Coordinate>();
  @Output() public mapReady = new EventEmitter<Map>();

  extent: Extent = [0, 0, 2048, 2048];
  projection: Projection | undefined;
  psoLayer: ImageLayer | undefined;
  view: View | undefined;
  map: Map | undefined;
  featuresSymbols: VectorLayer | undefined;
  featureStyles: Array<Style> = [];

  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.featureTypes && changes.featureTypes.currentValue) {
      this.updateFeatureTypes();
    }

    if (changes.mapFeatures && changes.mapFeatures.currentValue) {
      this.addFeatures();
    }
  }

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
    console.log('selectedFeatureType', this.selectedFeatureType);
    newFeature.setStyle(this.featureStyles[this.selectedFeatureType]);
    
    this.featuresSymbols?.getSource().addFeature(newFeature);
    this.addLocation.emit(event.coordinate);
  }

  private updateFeatureTypes(): void {
    this.featureStyles = [];
    this.featureTypes.forEach((featureType: featureType) => {
      this.featureStyles[featureType.Id] = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: featureType.Color
          })
        })
      });
    });
  }

  private addFeatures(): void {
    if (!this.map || this.mapFeatures.length === 0) {
      return;
    }
    
    const features = new Array<Feature>(this.mapFeatures.length);
    
    for(let i = 0; i < this.mapFeatures.length; i++) {
      const coordinates = [this.mapFeatures[i].XCoord, this.mapFeatures[i].YCoord];
      features[i] = new Feature(new Point(coordinates));
      features[i].setStyle(this.featureStyles[this.mapFeatures[i].FeatureTypeId]);
    }

    const featuresVectorSource = new VectorSource({
      features: [...features]
    });

    this.featuresSymbols = new VectorLayer({
      source: featuresVectorSource
    });

    this.map.addLayer(this.featuresSymbols);
  }
}