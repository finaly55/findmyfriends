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
    this.map = new Map('mapId').setView([47.2609,-1.58316], 100);

    // permet de choisir le thème de notre carte
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);    
    
    // permet d'ajouter un listener lié au zoom/dézoom sur la carte
    this.map
      .addEventListener("zoom", this.onZoom)

    //permet de boucler sur le fichier data.json qui contiens toute ma liste de contact et d'evenements 
    fetch('assets/data.json').then(res => res.json())
    .then(json => {
      this.friends = json.friends;
      this.events = json.events;
      this.leafletMap();
    });

    navigator.geolocation.watchPosition((position) => this.watchSuccess(position, this), this.watchError);
  }

  watchSuccess(position, context) {
    context.map.setView([position.coords.latitude, position.coords.longitude], 12);
      circleMarker([position.coords.latitude, position.coords.longitude], {radius: 10, color:"#ffff", fillOpacity: "1", fillColor: "#3880ff"})
      .addEventListener("click", context.onClickMarker)
      .addTo(context.map)
  }

  watchError(error){
    console.log('Error getting location', error);
  }
  // permet de zoomer sur un evenement/une personne quand on clique sur celui ci
  onClickMarker(e){
    if(e.target._mRadius == null){
      e.target.openPopup()
    }
    if (e.target._map._zoom <= 14){
      e.target._map.setView([e.latlng.lat, e.latlng.lng], 16);
    }
  }

  // permet de faire apparaitre ou non les popups des personnes au zoom/dézoom 
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
    //ajout de tous les marqueurs de mes contacts sur la map
    for (const friend of this.friends) {
      marker([friend.lat, friend.long]).addTo(this.map)
        .bindPopup(friend.name, {closeButton : false, autoClose: false, closeOnClick: false, autoPan: false, className: "popupMap", minWidth: 0})
        .addEventListener("click", this.onClickMarker)
    }
    //ajout de tous les cercles des événements sur la map
    for (const event of this.events) {
      circle([event.lat, event.long], {radius: event.radius, color : event.color}).addTo(this.map)
        .bindPopup(event.libelle, {closeButton : false, autoPan: false, className: "popupMap", minWidth: 0})
        .addEventListener("click", this.onClickMarker)
      }
  }

  // permet de recentrer la carte sur moi
  centerMe(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
          
      this.map.eachLayer(function (layer) {
        if(layer.color == "#ffff"){
          this.map.removeLayer(layer)
        }
      })
  
      circleMarker([resp.coords.latitude, resp.coords.longitude], {radius: 10, color:"#ffff", fillOpacity: "1", fillColor: "#3880ff"})
      .addEventListener("click", this.onClickMarker)
      .addTo(this.map)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }
}
