import {l2_basic_leaflet_map} from "../prototypes/l2-basic-leaflet-map.js"

export class l2_city_leaflet_map extends l2_basic_leaflet_map {

    leaflet_map_init(){
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        this.bing_options = {bingMapsKey: this.bing_maps_key, imagerySet: "AerialWithLabels"};
        L.tileLayer.bing(this.bing_options).addTo(this.leaflet_map);
        this.set_leaflet_map_view();
    }

    set_leaflet_map_view(){
        if(sessionStorage.getItem("city_latitude") !== null && sessionStorage.getItem("city_longitude") !== null){
        this.leaflet_map.setView([sessionStorage.getItem("city_latitude"), sessionStorage.getItem("city_longitude")], 14);
        }
    }

    basic_map_custom_style(){
        return `
        :host {
            margin: 0px;
            padding: 0px;
        }

        #l2-basic-leaflet-map {
            height: 100%;
            border-radius: 0.3em;
            box-shadow: 0px 0px 5px black;
         }`
     }
}

customElements.define('l2-city-leaflet-map', l2_city_leaflet_map)