import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Point from 'ol/geom/Point';
import { forkJoin } from 'rxjs';
import { featureType } from '../api/FeatureType';
import { FeaturetypeService } from '../api/featuretype.service';
import { MapFeatureService } from '../api/map-feature.service';
import { mapFeature } from '../api/mapFeature';
import { MapLocation } from '../ol-map/map-location';

@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrls: ['./test-map.component.scss']
})
export class TestMapComponent implements OnInit {
  public featureTypes: Array<featureType> = [];
  public mapFeatures: Array<mapFeature> = [];
  public form: FormGroup;

  constructor(
    private featuretypeService: FeaturetypeService,
    private mapFeatureService: MapFeatureService,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        featureType: [0]
      });
    }

  public ngOnInit(): void {
    forkJoin([this.featuretypeService.getFeatureTypes(), this.mapFeatureService.getMapFeatures()])
      .subscribe(([featureTypes, mapFeatures]: [featureType[], mapFeature[]]) => {
        this.featureTypes = featureTypes;
        this.mapFeatures = mapFeatures;
    });
  }

  public onMapReady(things: any): void {
    // console.log('map ready', things);
  }

  public addLocation(info: Coordinate): void {
    // console.log('clickedEvent', info);
    // console.log(this.form.value);
    this.mapFeatureService.addMapFeature({
      FeatureTypeId: this.form.controls.featureType.value,
      XCoord: info[0],
      YCoord: info[1]
    }).subscribe(() => {
      // console.log("jobs done");
    }, (error) => {
      console.error(error);
    });
  }

  public onCurrentLocation(location: MapLocation): void {
    // console.log(location);
  }

  public removeLocation(id: number): void {
    // console.log('deleting point ' + id);
    this.mapFeatureService.deleteMapFeature(id).subscribe(() => {
      // console.log('deleted');
    });
  }
}
