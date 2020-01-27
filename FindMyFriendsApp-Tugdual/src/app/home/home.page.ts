import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import leaflet from 'leaflet';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {

    @ViewChild('map', {static: false}) mapContainer: ElementRef;
    map: any;

    locateMaker: any;
    markerGroup: any = leaflet.featureGroup();
    locateMarkerGroup: any = leaflet.featureGroup();

    constructor(public alertController: AlertController) {
    }

    ionViewDidEnter() {
        this.loadmap();
    }

    loadmap() {
        if (this.map == null) {

            this.map = leaflet.map('map').fitWorld();

            leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                // tslint:disable-next-line:max-line-length
                attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
            }).addTo(this.map);

            this.map.locate({
                setView: true,
                maxZoom: 12
            }).on('locationfound', (e) => {
                this.markerGroup = leaflet.featureGroup();
                this.locateMaker = leaflet.marker([e.latitude, e.longitude]);
                const marker2: any = leaflet.marker([47.18482643123011, -1.5571365502929613]);
                const marker3: any = leaflet.marker([47.201909032764085, -1.4547237756414533]);

                const LeafIcon = leaflet.Icon.extend({
                    options: {
                        iconSize: [30, 30],
                        iconAnchor: [14, 29],
                        popupAnchor: [-3, 0]
                    }
                });

                const greenIcon = new LeafIcon({iconUrl: '/assets/loc.png'});
                const blueIcon = new LeafIcon({iconUrl: '/assets/pin.png'});


                this.locateMaker.bindTooltip('Julien').openTooltip();
                marker2.bindTooltip('Toto').openTooltip();

                this.locateMaker.setIcon(greenIcon);
                marker2.setIcon(blueIcon);
                marker3.setIcon(blueIcon);

                this.locateMarkerGroup.addLayer(this.locateMaker);
                this.map.addLayer(this.locateMarkerGroup);

                this.markerGroup.addLayer(marker2);
                this.markerGroup.addLayer(marker3);
                this.map.addLayer(this.markerGroup);

            }).on('locationerror', (err) => {
                alert(err.message);
            });

        }
    }

    locate() {
        this.map.locate({
            setView: true,
            maxZoom: 12
        }).on('locationfound', (e) => {
            this.locateMarkerGroup = null;
            this.locateMarkerGroup = leaflet.featureGroup();
            this.locateMaker = leaflet.marker([e.latitude, e.longitude]);
        });
    }

    async sendAlert() {
        const alert = await this.alertController.create({
            header: 'Alert !',
            message: 'Voulez-vous envoyer une alerte à votre groupe ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: 'Oui'
                }
            ]
        });
        await alert.present();
    }
}


