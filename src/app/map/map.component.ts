import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private description = 'salut mon pote';
  private museename = 'musée de l\'impression sur étoffes';
  private adresse = '6 rue du moulin';
  private Website ='https:// LesiteDumusE.com'
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 47.7486, 7.33944 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });




    tiles.addTo(this.map);
    var popup = L.popup().setContent('<p style="font-weight: bold;">Musée : </p> '+ this.museename+'' +
                                         '<p style="font-weight: bold;"> Adresse : </p>'+this.adresse +
                                          '<p style="font-weight: bold;">Description : </p> '+this.description+
                                            '<p style="font-weight: bold;"> Dispositif : </p><ul>'+'<li>'+'audio guide'+'</li>'+'</ul>'+
                                            '<p style="font-weight: bold;">SiteWeb : </p>'+'<a href="'+ this.Website + '">SiteWeb du musée<a/>')



    const marker = L.marker([47.7448968,7.3449397],{
      icon : this.smallIcon

    });
    marker.addTo(this.map).bindPopup(popup).openPopup();
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
