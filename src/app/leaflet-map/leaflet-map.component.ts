import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements AfterViewInit {

  private map;
  private router: Router;
  private zone: NgZone;

  private options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ]
  };

  onMapReady (map: L.map) {
    var gewannPolygon = L.polygon([
      L.latLng(49.218531, 8.677058),
      L.latLng(49.216258, 8.676849),
      L.latLng(49.216280, 8.674748),
      L.latLng(49.216217, 8.674712),
      L.latLng(49.216199, 8.676846),
      L.latLng(49.216100, 8.676861),
      L.latLng(49.216188, 8.677283),
      L.latLng(49.218530, 8.677462)
    ], {
      color: 'red'
    }).addTo(map);

    var trees = [
        L.latLng(49.218523, 8.677202),
        L.latLng(49.218400, 8.677193),
        L.latLng(49.218310, 8.677184),
        L.latLng(49.217826, 8.677112),
        L.latLng(49.217069, 8.677103),
        L.latLng(49.218023, 8.677368),
        L.latLng(49.216232, 8.676591),
        L.latLng(49.216239, 8.676211),
        L.latLng(49.216240, 8.675681),
        L.latLng(49.216245, 8.675173)
      ];
  
      var treeMarkers = [];

      var router : Router = this.router;
      var zone : NgZone = this.zone;
  
      trees.forEach((tree) => {
        treeMarkers.push(
          L.marker(tree, {
            icon: L.icon({
               iconSize: [ 25, 41 ],
               iconAnchor: [ 13, 41 ],
               iconUrl: 'assets/marker-icon.png',
               shadowUrl: 'assets/marker-shadow.png'
            })
          }).on('click', function () {
            //fix for router
            zone.run(function () {
              router.navigate(['/', 'detail']);
            });
            
          }).addTo(map))
      });


    map.fitBounds(gewannPolygon.getBounds());
  }

  constructor(router:Router, zone: NgZone) {
    this.router = router;
    this.zone = zone;
   }

  ngAfterViewInit() {
    // this.map = L.map('map', {
    // });

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    // var gewannPolygon = L.polygon([
    //   L.latLng(49.218531, 8.677058),
    //   L.latLng(49.216258, 8.676849),
    //   L.latLng(49.216280, 8.674748),
    //   L.latLng(49.216217, 8.674712),
    //   L.latLng(49.216199, 8.676846),
    //   L.latLng(49.216100, 8.676861),
    //   L.latLng(49.216188, 8.677283),
    //   L.latLng(49.218530, 8.677462)
    // ], {
    //   color: 'red'
    // }).addTo(this.map);

    // var trees = [
    //   L.latLng(49.218523, 8.677202),
    //   L.latLng(49.218400, 8.677193),
    //   L.latLng(49.218310, 8.677184),
    //   L.latLng(49.217826, 8.677112),
    //   L.latLng(49.217069, 8.677103),
    //   L.latLng(49.218023, 8.677368),
    //   L.latLng(49.216232, 8.676591),
    //   L.latLng(49.216239, 8.676211),
    //   L.latLng(49.216240, 8.675681),
    //   L.latLng(49.216245, 8.675173)
    // ];

    // var treeMarkers = [];

    // trees.forEach((tree) => {
    //   treeMarkers.push(
    //     L.marker(tree).addTo(this.map)
    //   );
    // });

    // //allign view to contain polygon
    // this.map.fitBounds(gewannPolygon.getBounds());


  }

}
