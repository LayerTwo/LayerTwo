import {l2_local_leaflet_map} from "./l2-local-leaflet-map"

export class l2_local_leaflet_map_problem_form extends l2_local_leaflet_map {

    leaflet_map_init(){
        document.addEventListener("l2-update-local-problem-form-map-marker-position", this.update_marker_position.bind(this), true);
        document.addEventListener("l2-reset-local-problem-form-map-marker-position", this.reset_marker_position.bind(this), true);
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        this.leaflet_map.on("click", this.dispatch_latlng_event.bind(this));
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(this.leaflet_map);
        this.set_leaflet_map_view();
        this.marker = L.marker([parseFloat(sessionStorage.getItem("entity_latitude")), parseFloat(sessionStorage.getItem("entity_longitude"))],{icon: this.marker_normal_icon}).addTo(this.leaflet_map);
        this.local_area_indicator = L.polygon([
            [parseFloat(sessionStorage.getItem("entity_latitude"))+0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))-0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))+0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))+0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))-0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))+0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))-0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))-0.00100]],{fillOpacity: 0}).addTo(this.leaflet_map);
    }

    dispatch_latlng_event(event){
        this.dispatchEvent(new CustomEvent("l2-leaflet-local-problem-form-latlgn", { detail: {latitude: event.latlng.lat, longitude: event.latlng.lng}, bubble: true, composed: true }));
        this.marker.setLatLng([parseFloat(event.latlng.lat.toFixed(5)), parseFloat(event.latlng.lng.toFixed(5))]).update();
    }

    update_marker_position(event){
        this.marker.setLatLng([parseFloat(event.detail.position.coords.latitude.toFixed(5)), parseFloat(event.detail.position.coords.longitude.toFixed(5))]).update();
    }

    reset_marker_position(){
        this.marker.setLatLng([parseFloat(sessionStorage.getItem("entity_latitude")), parseFloat(sessionStorage.getItem("entity_longitude"))],{icon: this.marker_normal_icon});
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

customElements.define('l2-local-leaflet-map-problem-form', l2_local_leaflet_map_problem_form)