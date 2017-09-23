import {l2_basic_leaflet_map} from "../prototypes/l2-basic-leaflet-map.js"

export class l2_country_leaflet_map extends l2_basic_leaflet_map {

    leaflet_map_init(){
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        L.tileLayer("https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=8799bf259cc546a997a57ca4d638996e", {maxZoom: 18}).addTo(this.leaflet_map);
        this.leaflet_map.setView([-13.7361, -172.1049], 10);
    }

    basic_map_custom_style(){
        return `#l2-basic-leaflet-map {
            flex-grow: 1;
         }`
     }
}

customElements.define('l2-country-leaflet-map', l2_country_leaflet_map)