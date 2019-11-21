import { Injectable } from '@angular/core';
import { Marker } from './marker';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getAirBnBs(borough: string): Marker[]{
    return [new Marker("example Airbnb", 40.6782, -73.9442)];
  }

  getRats(borough: string): Marker[]{
    return [new Marker("example Airbnb", 40.7, -73.8)];
  }

  getCrimes(borough: string): Marker[]{
    return [new Marker("example Airbnb", 40.6, -73.7)];
  }

  getRatsAtLarge(borough: string): Marker[]{
    return [];
  }
}


