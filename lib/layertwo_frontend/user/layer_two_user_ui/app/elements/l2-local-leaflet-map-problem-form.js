import {l2_local_leaflet_map} from "./l2-local-leaflet-map"

export class l2_local_leaflet_map_problem_form extends l2_local_leaflet_map {

    leaflet_map_init(){
        document.addEventListener("l2-update-local-problem-submit-map-marker-position", this.update_marker_position.bind(this), true);
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        this.leaflet_map.on("click", this.dispatch_latlng_event.bind(this));
        L.Icon.Default.imagePath = '/images/';
        L.tileLayer("https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png", {attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 18}).addTo(this.leaflet_map);
        this.set_leaflet_map_view();
        this.marker = L.marker([parseFloat(sessionStorage.getItem("entity_latitude")), parseFloat(sessionStorage.getItem("entity_longitude"))]).addTo(this.leaflet_map);
        this.local_area_indicator = L.polygon([
            [parseFloat(sessionStorage.getItem("entity_latitude"))+0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))-0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))+0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))+0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))-0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))+0.00100], 
            [parseFloat(sessionStorage.getItem("entity_latitude"))-0.00075, parseFloat(sessionStorage.getItem("entity_longitude"))-0.00100]],{fillOpacity: 0.1}).addTo(this.leaflet_map);
    }

    dispatch_latlng_event(event){
        this.dispatchEvent(new CustomEvent("l2-leaflet-local-problem-form-latlgn", { detail: {latitude: event.latlng.lat, longitude: event.latlng.lng}, bubble: true, composed: true }));
        this.marker.setLatLng([parseFloat(event.latlng.lat.toFixed(5)), parseFloat(event.latlng.lng.toFixed(5))]).update();
    }

    update_marker_position(event){
        this.marker.setLatLng([parseFloat(event.detail.position.coords.latitude.toFixed(5)), parseFloat(event.detail.position.coords.longitude.toFixed(5))]).update();
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