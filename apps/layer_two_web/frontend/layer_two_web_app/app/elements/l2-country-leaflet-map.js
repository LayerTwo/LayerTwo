import {l2_basic_leaflet_map} from "../prototypes/l2-basic-leaflet-map.js"

export class l2_country_leaflet_map extends l2_basic_leaflet_map {

    leaflet_map_init(){
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        L.tileLayer("https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png", {attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 18}).addTo(this.leaflet_map);
        this.leaflet_map.setView([-13.6550, -172.1049], 10);
    }

    basic_map_custom_style(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            margin: 0px;
            padding: 0px;
            perspective: 55em;
        }

        #l2-basic-leaflet-map {
             border-radius: 1em;
             flex-grow: 1;
             transform: rotatex(54deg);
             transform-origin: center 40em;
         }`
     }
}

customElements.define('l2-country-leaflet-map', l2_country_leaflet_map)