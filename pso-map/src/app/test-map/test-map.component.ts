import { Component, OnInit } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Point from 'ol/geom/Point';
import { featureType } from '../api/FeatureType';
import { FeaturetypeService } from '../api/featuretype.service';
import { MapFeatureService } from '../api/map-feature.service';
import { MapLocation } from '../ol-map/map-location';

@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrls: ['./test-map.component.scss']
})
export class TestMapComponent implements OnInit {
  public featureTypes: Array<featureType> = [];

  constructor(
    private featuretypeService: FeaturetypeService,
    private mapFeatureService: MapFeatureService) { }

  public ngOnInit(): void {
    this.featuretypeService.getFeatureTypes().subscribe((types: featureType[]) => {
      this.featureTypes = types;
      console.log(this.featureTypes);
    });
    this.mapFeatureService.getMapFeatures().subscribe((mapFeatures) => {
      console.log(mapFeatures);
    });
    this.mapFeatureService.getMapFeaturesForType(1).subscribe((mapFeatures) => {
      console.log(mapFeatures);
    });
  }

  public onMapReady(things: any): void {
    console.log('map ready', things);
  }

  public addLocation(info: Coordinate): void {
    console.log('clickedEvent', info);
    this.mapFeatureService.addMapFeature({
      featureTypeId: 1,
      xCoord: info[0],
      yCoord: info[1]
    }).subscribe(() => {
      console.log("jobs done");
    }, (error) => {
      console.error(error);
    });
  }

  public onCurrentLocation(location: MapLocation): void {
    // console.log(location);
  }
}
