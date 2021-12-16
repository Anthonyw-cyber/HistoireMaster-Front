import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {GeoApiGouvAddressResponse, GeoApiGouvAddressService} from "@placeme/ngx-geo-api-gouv-address";
import {museeService} from "../controller/service/service-musee";
import {MuseeInterface} from "../controller/Interface/musee-interface";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit,OnInit {
  data: any ;
  private map: any;
  private description = 'salut mon pote';
  private museename = 'musée de l\'impression sur étoffes';
  private adresse = '3rue du mélèze,68350 Brunstatt-Didenheim';
  private Website =' https://google.com';
dispo : any;

private Muse = [{id : 1, museeName:'musee de l\'auto',adresse :'17 rue de la Mertzau, 68 100 Mulhouse',description:'yolespetitpote',siteweb:'https://google.com', dispositif:['audioguide','chaiseroulante','MonteCharge'],handicap:['Moteur','visuel'] },
  {id : 1, museeName:'musée de l\'impression sur etoffe',adresse :'14 Rue Jean Jacques Henner, 68100 Mulhouse',description:'yolespetitpote',siteweb:'https://google.com', dispositif:['audioguide','chaiseroulante','MonteCharge'],handicap:['Moteur','visuel'] },
  {id : 1, museeName:'Electropolis',adresse :'55 Rue du Pâturage, 68200 Mulhouse',description:'yolespetitpote',siteweb:'https://google.com', dispositif:['audioguide','chaiseroulante','MonteCharge'],handicap:['Moteur','visuel'] }];


  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  private initMap( ): void {
    this.map = L.map('map', {
      center: [ 47.7486, 7.33944 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


for( let i=0;i< this.Muse.length; i++){}

    tiles.addTo(this.map);
  /*  var popup = L.popup().setContent('<p style="font-weight: bold;">Musée : </p> '+ this.museename+'' +
                                         '<p style="font-weight: bold;"> Adresse : </p>'+this.adresse +
                                          '<p style="font-weight: bold;">Description : </p> '+this.description+
                                            '<p style="font-weight: bold;"> Dispositif : </p><ul>'+'<li>'+'audio guide'+'</li>'+'</ul>'+
                                            '<p style="font-weight: bold;">SiteWeb : </p>'+'<a href="'+ this.Website + '">SiteWeb du musée<a/>')*/








  }
  private markerFunction(apiadresse: any, element :any){

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    var popup = L.popup().setContent('<p style="font-weight: bold;">Musée : </p> '+ element.name+
      '<p style="font-weight: bold;"> Adresse : </p>'+element.adresse +
      '<p style="font-weight: bold;">Description : </p> '+element.description+
      '<p style="font-weight: bold;"> Handicap :  </p>'+element.handicap[0].name+
      '<p style="font-weight: bold;"> Dispositif : </p>' + element.handicap[0].dispositif[0].name+
      '<p style="font-weight: bold;"> Typologie : </p>' + element.typologie+

      '<p style="font-weight: bold;">SiteWeb : </p>'+'<a href="'+ element.siteWeb + '">SiteWeb du musée<a/>')



   var marker = L.marker([apiadresse.features[0].geometry.coordinates[1],apiadresse.features[0].geometry.coordinates[0]],{
      icon : this.smallIcon

    });
    marker.addTo(this.map).bindPopup(popup).openPopup();

  }

  constructor(private geoApiGouvAddressService: GeoApiGouvAddressService, private mapService: museeService) {

  }

  ngOnInit(): void {

    this.mapService.findMusee().subscribe(map => {
      this.data = map
      console.log(this.data)
      this.data.forEach((element: { adresse: any; }) =>
        this.geoApiGouvAddressService

          .query({ q: element.adresse })
          .subscribe((geoApiGouvAddressResponse: GeoApiGouvAddressResponse) => {
            console.log(geoApiGouvAddressResponse);
            this.markerFunction(geoApiGouvAddressResponse, element )
          }));
    })



    }

  ngAfterViewInit(): void {

    this.initMap();





}



  }


