import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, circle, circleMarker, point } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  map: Map;
  friends = [];
  events = [];

  constructor(private geolocation: Geolocation) {}

  ionViewDidEnter() { 
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([47.2609,-1.58316], 100);
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);    
    
    this.map
      .addEventListener("zoom", this.onZoom)


    fetch('assets/data.json').then(res => res.json())
    .then(json => {
      this.friends = json.friends;
      this.events = json.events;
      this.leafletMap();
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 12);
      circleMarker([resp.coords.latitude, resp.coords.longitude], {radius: 10, color:"#ffff", fillOpacity: "1", fillColor: "#3880ff"}).addTo(this.map)

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onClickMarker(e){
    e.target.openPopup()
    if (e.target._map._zoom <= 14){
      e.target._map.setView([e.latlng.lat, e.latlng.lng], 16);
    }
  }

  onZoom(e){
    
    if (e.target._zoom <= 14){
        e.target.eachLayer(function (layer) {
          layer.closePopup()
      });
    }
    else{
      e.target.eachLayer(function (layer) { 
        if(layer._mRadius == null){
          layer.openPopup()
        }
    });
    }
  }

  leafletMap() {
    for (const friend of this.friends) {
      marker([friend.lat, friend.long]).addTo(this.map)
        .bindPopup(friend.name, {closeButton : false, autoClose: false, closeOnClick: false, autoPan: false, className: "popupMap", minWidth: 0})
        .addEventListener("click", this.onClickMarker)
    }
    for (const event of this.events) {
      circle([event.lat, event.long], {radius: event.radius, color : event.color}).addTo(this.map)
        .bindPopup(event.libelle, {closeButton : false, autoPan: false, className: "popupMap", minWidth: 0})
        .addEventListener("click", this.onClickMarker)
      }
  }

  centerMe(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
