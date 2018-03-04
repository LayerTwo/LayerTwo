import { l2_local_leaflet_map } from "./l2-local-leaflet-map"

export class l2_local_leaflet_map_list_problems extends l2_local_leaflet_map {

    leaflet_map_init() {
        this.marker_array = new Array();
        document.addEventListener("l2-local-problems-create-leaflet-marker", this.create_marker.bind(this), true);
        document.addEventListener("l2-local-problems-remove-leaflet-marker", this.remove_marker.bind(this), true);
        document.addEventListener("l2-local-problem-list-element-clicked", this.local_problem_selected.bind(this), true);
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        L.Icon.Default.imagePath = '/images/';
        this.bing_options = {bingMapsKey: this.bing_maps_key, imagerySet: "AerialWithLabels"};
        L.tileLayer.bing(this.bing_options).addTo(this.leaflet_map);
        this.set_leaflet_map_view();
        this.local_area_indicator = L.polygon([
            [parseFloat(sessionStorage.getItem("entity_latitude")) + 0.00075, parseFloat(sessionStorage.getItem("entity_longitude")) - 0.00100],
            [parseFloat(sessionStorage.getItem("entity_latitude")) + 0.00075, parseFloat(sessionStorage.getItem("entity_longitude")) + 0.00100],
            [parseFloat(sessionStorage.getItem("entity_latitude")) - 0.00075, parseFloat(sessionStorage.getItem("entity_longitude")) + 0.00100],
            [parseFloat(sessionStorage.getItem("entity_latitude")) - 0.00075, parseFloat(sessionStorage.getItem("entity_longitude")) - 0.00100]], { fillOpacity: 0 }).addTo(this.leaflet_map);
        this.dispatchEvent(new CustomEvent("l2-local-problems-list-map-ready", { bubble: true, composed: true }));
    }

    create_marker(data) {
        this.marker_uuid = data.detail.local_problem_uuid;
        this.marker_array.push(L.marker([parseFloat(data.detail.local_problem_latitude), parseFloat(data.detail.local_problem_longitude)], { title: data.detail.local_problem_uuid }).addTo(this.leaflet_map));
        this.dispatchEvent(new CustomEvent("l2-local-problems-map-marker-created", { detail: { marker_uuid: data.detail.local_problem_uuid }, bubble: true, composed: true }));
    }

    remove_marker(data) {
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.title === data.detail.local_problem_uuid) {
                item.remove();
                this.marker_array.splice(index, 1);
            }
        }, this);
    }

    local_problem_selected(data) {
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.title === data.detail.local_problem_uuid) {
                if (item.selected !== "true") {
                    item.setIcon(this.marker_selected_icon);
                    item.selected = "true";
                } else {
                    item.setIcon(this.marker_normal_icon);
                    item.selected = "false";
                }
            }
        }, this);
    }

}

customElements.define('l2-local-leaflet-map-list-problems', l2_local_leaflet_map_list_problems)