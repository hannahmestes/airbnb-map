import { Observable } from 'rxjs/internal/Rx';
import { JSON_CONFIG_FILENAME } from 'tslint/lib/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from './marker';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  airBnBs: Marker[] = [];
  rats: Marker[] = [];
  crimes: Marker[] = [];


  constructor(private http: HttpClient) { 

  }

  getAirBnBs(borough: string): Observable<any>{
    //return [new Marker("example Airbnb", 40.6782, -73.9442)];
    return this.http.get('http://localhost:3000/airbnb/' + this.getBid(borough));
  }

  getRats(borough: string): Observable<any>{
    return this.http.get('http://localhost:3000/rat/' + this.getBid(borough));
  }

  getCrimes(borough: string): Observable<any>{
    return this.http.get('http://localhost:3000/crime/' + this.getBid(borough));
  }

  getBid(borough: string){
    if(borough == "The Bronx")
      return 3;
    if (borough == "Brooklyn")
      return 4;
    if (borough == "Manhattan")
      return 5;
    if (borough == "Queens")
      return 6;
    if (borough = "Staten Island")
      return 7;
  }
}


