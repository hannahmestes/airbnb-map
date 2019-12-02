import { Subscription } from 'rxjs/internal/Rx';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Marker } from './marker';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  boroughs = ["Manhattan", "Brooklyn", "Queens", "Staten Island", "The Bronx"];
  form: FormGroup;
  currentBorough= "Brooklyn";
  airBnBMarkers: Marker[];
  ratMarkers: Marker[];
  crimeMarkers: Marker[];

  asubsc: Subscription;
  rsubsc: Subscription;
  csubsc: Subscription;

  showAirBnBs= true;
  showCrimes= true;
  showRats= true;

  airbnbIcon = {
    url: "assets/home.svg",
    scaledSize: {
        width: 40,
        height: 60
    }
  };

  crimeIcon = {
    url: "assets/flasher.svg",
    scaledSize: {
        width: 40,
        height: 60
    }
  };

  ratIcon = {
    url: "assets/rat.svg",
    scaledSize: {
        width: 40,
        height: 60
    }
  };

  title = 'Best AirBnBs in NYC';
  lat = 40.6782;
  lng = -73.9442;
  zoom = 12;

  constructor(private formBuilder: FormBuilder, private database: DatabaseService) {}

  ngOnInit() {
  this.form = new FormGroup({
    showAirBnBs: new FormControl(this.showAirBnBs),
    showCrimes: new FormControl(this.showCrimes),
    showRats: new FormControl(this.showRats),
    boroughSelected: new FormControl(this.currentBorough)
  });

  this.getMarkers(this.currentBorough);
  this.onChanges();
  }

  onChanges(): void {
  this.form.valueChanges.subscribe(val => {
    this.showRats = val.showRats;
    this.showCrimes = val.showCrimes;
    this.showAirBnBs =val.showAirBnBs;
    if(val.boroughSelected != this.currentBorough){
      this.setMapCenter(val.boroughSelected);
      this.getMarkers(val.boroughSelected);
      this.currentBorough = val.boroughSelected;
    }
    })
  }

  setMapCenter(borough){
    this.zoom = 12;
    switch(borough){
      case "Brooklyn":{
        this.lat = 40.6782;
        this.lng = -73.9442;
        break;
      }
      case "Manhattan":{
        this.lat = 40.7831;
        this.lng = -73.9712;
        break;
      }
      case "Staten Island":{
        this.lat = 40.5795;
        this.lng = -74.1502;
        break;
      }
      case "Queens":{
        this.lat = 40.7282;
        this.lng = -73.7949;
        break;
      }
      case "The Bronx":{
        this.lat = 40.8448;
        this.lng = -73.8648;
        break;
      }
    }
  }

  getMarkers(borough){    
    if(this.asubsc) this.asubsc.unsubscribe();
    if(this.rsubsc) this.rsubsc.unsubscribe();
    if(this.csubsc) this.csubsc.unsubscribe();
    this.airBnBMarkers = [];
    this.ratMarkers = [];
    this.crimeMarkers = [];

    this. asubsc = this.database.getAirBnBs(borough).subscribe( airbnbs=>{
      airbnbs.forEach(element=> {
        this.airBnBMarkers.push(new Marker(element.name, element.latitude, element.longitude))
      });
    });
    this.database.getRats(borough).subscribe(rats=> {
      rats.forEach(element => {
        this.ratMarkers.push(new Marker("", element.Latitude, element.Longitude));
      })
    });
    this.database.getCrimes(borough).subscribe(crimes => {
      crimes.forEach(element => {
        this.crimeMarkers.push(new Marker(element.Description, element.Latitude, element.Longitude));
      })
    });
  }


}


