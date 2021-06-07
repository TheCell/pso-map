import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public layersForm: FormGroup;
  public activeLayers: Array<number> = [];

  constructor(
    private featuretypeService: FeaturetypeService,
    private mapFeatureService: MapFeatureService,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        featureType: [0]
      });

      this.layersForm = this.formBuilder.group({
        layers: new FormArray([])
      });

      this.layersForm.valueChanges.subscribe((changes) => {
        this.activeLayers = [];
        for (let i = 0; i < changes.layers.length; i++) {
          if (changes.layers[i]) {
            this.activeLayers.push(this.featureTypes[i].Id);
          }
        }
      });
    }

  get layersFormArray(): FormArray {
    return this.layersForm.controls.layers as FormArray;
  }

  public ngOnInit(): void {
    forkJoin([this.featuretypeService.getFeatureTypes(), this.mapFeatureService.getMapFeatures()])
      .subscribe(([featureTypes, mapFeatures]: [featureType[], mapFeature[]]) => {
        featureTypes.forEach((featureType) => {
          featureType.Id = Number(featureType.Id);
        });
        this.featureTypes = featureTypes;
        this.mapFeatures = mapFeatures;

        this.featureTypes.forEach(() => this.layersFormArray.push(new FormControl(false)));
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
