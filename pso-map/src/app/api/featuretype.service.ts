import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { featureType } from './FeatureType';
import { environment } from './../../environments/environment';

@Injectable()
export class FeaturetypeService {
  private featureTypeUrl = `${environment.apiUrl}featuretype/`;

  constructor(private http: HttpClient) { }

  public getFeatureTypes() {
    return this.http.get<Array<featureType>>(this.featureTypeUrl);
  }

  public getFeatureType(id: number) {
    return this.http.get<featureType>(`${this.featureTypeUrl}${id}`);
  }
}
