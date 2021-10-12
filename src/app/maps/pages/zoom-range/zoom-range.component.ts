import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        height: 100%;
        width: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width:400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { 
    console.log('constructor',this.divMap);
  }

  ngAfterViewInit(): void {

    console.log('afterViewInit',this.divMap);
    
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -66.97066012713168, 10.432437931112172 ],
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom()

    })

    this.map.on('zoomend', (event) => {
      if ( this.map.getZoom() > 18 ) {
        this.map.zoomTo(18);
      }

    })

  }

  zommIn(){
    this.map.zoomIn();
  }

  zommOut(){
    this.map.zoomOut();
    console.log( this.map.getZoom() );
  }

  zoomChange( value: string ){
    this.map.zoomTo( Number(value) );
  }
}
