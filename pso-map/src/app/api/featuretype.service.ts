import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { featureType } from './FeatureType';

@Injectable()
export class FeaturetypeService {
  private featureTypeUrl = 'https://psomap.thecell.eu/api/public/index.php/featuretype/';

  constructor(private http: HttpClient) { }

  public getFeatureTypes() {
    return this.http.get<Array<featureType>>(this.featureTypeUrl);
  }

  public getFeatureType(id: number) {
    return this.http.get<featureType>(`${this.featureTypeUrl}${id}`);
  }
}
