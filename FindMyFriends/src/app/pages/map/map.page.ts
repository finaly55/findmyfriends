import {Component, OnDestroy, OnInit} from '@angular/core';
import {Map, latLng, tileLayer, Layer, marker, circle, circleMarker, point} from 'leaflet';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import leaflet from 'leaflet';

import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import * as firebase from 'firebase';
import {log} from 'util';
import {Friend} from '../../core/models/friend';
import {FirebaseService} from '../../core/services/firebase.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
    map: Map;
    events = [];
    locateMarker: any;
    friends: Friend[];

    constructor(private geolocation: Geolocation) {
    }

    ngOnInit() {
        this.showFriendsMakers();
    }

    ionViewDidEnter() {
        this.initMap();
    }

    initMap() {
        if (this.map == null) {
            this.map = leaflet.map('map').fitWorld();

            // permet de choisir le thème de notre carte
            leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: 'edupala.com'
            }).addTo(this.map);

            // permet d'ajouter un listener lié au zoom/dézoom sur la carte
            this.map.addEventListener('zoom', this.onZoom);

            // localise et centre l'utilisateur
            this.centerMe();

            // permet de boucler sur le fichier data.json qui contiens toute ma liste de contact et d'evenements
            /*fetch('assets/data.json').then(res => res.json())
                .then(json => {
                    this.friends = json.friends;
                    this.events = json.events;
                    this.showFriendsMakers();
                });*/
        }
    }

    /* Show friends market of event */
    showFriendsMakers() {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(s => {
            /*Afficher les markers de mes amis*/
            s.data().activeGroup.members.map(m => {
                if (m.coords.lat) {
                    marker([m.coords.lat, m.coords.lng]).addTo(this.map)
                        .bindPopup(m.name, {
                            closeButton: false,
                            autoClose: false,
                            closeOnClick: false,
                            autoPan: false,
                            className: 'popupMap',
                            minWidth: 0
                        })
                        .addEventListener('click', this.onClickMarker);
                }
            });
        });
        // ajout de tous les marqueurs de mes contacts sur la map
        /*for (const friend of this.friends) {
            marker([friend.lat, friend.long]).addTo(this.map)
                .bindPopup(friend.name, {
                    closeButton: false,
                    autoClose: false,
                    closeOnClick: false,
                    autoPan: false,
                    className: 'popupMap',
                    minWidth: 0
                })
                .addEventListener('click', this.onClickMarker);
        }*/
        // ajout de tous les cercles des événements sur la map
        /*for (const event of this.events) {
            circle([event.lat, event.long], {radius: event.radius, color: event.color}).addTo(this.map)
                .bindPopup(event.libelle, {closeButton: false, autoPan: false, className: 'popupMap', minWidth: 0})
                .addEventListener('click', this.onClickMarker);
        }*/
    }

    // permet de recentrer la carte sur moi
    centerMe() {
        this.geolocation.getCurrentPosition().then((resp) => {
            if (this.locateMarker) {
                this.map.removeLayer(this.locateMarker);
            }
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                .update({coords: {lat: resp.coords.latitude, lng: resp.coords.longitude}});
            this.map.setView([resp.coords.latitude, resp.coords.longitude], 17);
            this.locateMarker = new leaflet.circleMarker([resp.coords.latitude, resp.coords.longitude], {
                radius: 10,
                color: '#ffff',
                fillOpacity: '1',
                fillColor: '#3880ff'
            });
            this.map.addLayer(this.locateMarker);
        }).catch(err => {
            alert(err.message);
        });
    }

    // permet de zoomer sur un evenement/une personne quand on clique sur celui ci
    onClickMarker(e) {
        console.log('click on marker');
        if (e.target._mRadius == null) {
            e.target.openPopup();
        }
        if (e.target._map._zoom <= 14) {
            e.target._map.setView([e.latlng.lat, e.latlng.lng], 16);
        }
    }

    // permet de faire apparaitre ou non les popups des personnes au zoom/dézoom
    onZoom(e) {
        if (e.target._zoom <= 14) {
            e.target.eachLayer((layer) => {
                layer.closePopup();
            });
        } else {
            e.target.eachLayer((layer) => {
                if (layer._mRadius == null) {
                    layer.openPopup();
                }
            });
        }
    }

    /* Remove map when we have multiple map object */
    ngOnDestroy(): void {
        this.map.remove();
    }
}


