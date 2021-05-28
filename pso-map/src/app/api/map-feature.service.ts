import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mapFeature } from './mapFeature';

@Injectable({
  providedIn: 'root'
})
export class MapFeatureService {
  private mapFeatureUrl = 'https://psomap.thecell.eu/api/public/index.php/mapfeature/';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  public getMapFeatures() {
    return this.http.get<Array<mapFeature>>(this.mapFeatureUrl);
  }

  public getMapFeaturesForType(id: number) {
    return this.http.get<mapFeature>(`${this.mapFeatureUrl}${id}`);
  }

  public addMapFeature(mapFeature: mapFeature) {
    return this.http.post(this.mapFeatureUrl, mapFeature).pipe(catchError(val => of(`addMapFeature failed`)));
  }
}
