import {l2_basic_leaflet_map} from "../prototypes/l2-basic-leaflet-map.js"

export class l2_local_leaflet_map extends l2_basic_leaflet_map {

    leaflet_map_init(){
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        L.Icon.Default.imagePath = '/images/';
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(this.leaflet_map);
        this.set_leaflet_map_view();
    }
    
    set_leaflet_map_view(){
        if(sessionStorage.getItem("entity_latitude") !== null && sessionStorage.getItem("entity_longitude") !== null){
        this.leaflet_map.setView([parseFloat(sessionStorage.getItem("entity_latitude")), parseFloat(sessionStorage.getItem("entity_longitude"))], 18);
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

customElements.define('l2-local-leaflet-map', l2_local_leaflet_map)