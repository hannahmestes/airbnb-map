export class Marker{
    label: string;
    lat: number;
    lng: number;

    constructor(label: string, lat: number, lng: number){
        this.label = label;
        this.lat = lat;
        this.lng = lng;
    }
}