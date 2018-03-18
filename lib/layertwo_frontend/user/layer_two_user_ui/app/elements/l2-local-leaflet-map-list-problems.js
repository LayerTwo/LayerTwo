import { l2_local_leaflet_map } from "./l2-local-leaflet-map"

export class l2_local_leaflet_map_list_problems extends l2_local_leaflet_map {

    leaflet_map_init() {
        this.marker_array = new Array();
        document.addEventListener("l2-local-problems-create-leaflet-marker", this.create_marker.bind(this), true);
        document.addEventListener("l2-local-problems-remove-leaflet-marker", this.remove_marker.bind(this), true);
        document.addEventListener("l2-local-problem-list-element-clicked", this.element_or_marker_selected.bind(this), true);
        document.addEventListener("l2-local-problem-list-marker-clicked", this.element_or_marker_selected.bind(this), true);
        document.addEventListener("l2-city-local-problems-disable-marker", this.disable_marker.bind(this), true);
        document.addEventListener("l2-city-local-problems-enable-marker", this.enable_marker.bind(this), true);
        document.addEventListener("l2-local-problems-list-highlight-updated-element", this.highlight_edited_marker_and_element.bind(this), true);
        this.map_container = this.shadowRoot.querySelector("#l2-basic-leaflet-map");
        this.leaflet_map = L.map(this.map_container);
        L.Icon.Default.imagePath = '/images/';
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(this.leaflet_map);
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
        let current_marker = L.marker([parseFloat(data.detail.local_problem_latitude), 
                                       parseFloat(data.detail.local_problem_longitude)], 
                                                 { icon: this.marker_normal_icon,
                                                   uuid: data.detail.local_problem_uuid });
        current_marker.on('mouseover', function (e) {this.openPopup();});
        current_marker.on('mouseout', function (e) {this.closePopup();});
        current_marker.on('click', event => this.dispatchEvent(new CustomEvent("l2-local-problem-list-marker-clicked", 
                                                              { detail:{local_problem_uuid: data.detail.local_problem_uuid}, 
                                                                bubble: true, composed: true })));
        current_marker.bindPopup(data.detail.local_problem_title, {autoClose: false, autoPan: false});
        current_marker.addTo(this.leaflet_map);
        this.marker_array.push(current_marker);                                                          
                                                                        
        this.dispatchEvent(new CustomEvent("l2-local-problems-map-marker-created", { detail: { marker_uuid: data.detail.local_problem_uuid }, bubble: true, composed: true }));
    }

    disable_marker(data){
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.uuid === data.detail.local_problem_uuid) {
                item.off('click');
            }
        }, this);
    }

    enable_marker(data){
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.uuid === data.detail.local_problem_uuid) {
                item.on('click',  event => this.dispatchEvent(new CustomEvent("l2-local-problem-list-marker-clicked", 
                { detail:{local_problem_uuid: data.detail.local_problem_uuid}, 
                  bubble: true, composed: true })));
            }
        }, this);
    }

    remove_marker(data) {
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.uuid === data.detail.local_problem_uuid) {
                item.remove();
                this.marker_array.splice(index, 1);
            }
        }, this);
    }

    highlight_edited_marker_and_element(data){
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.uuid === data.detail.local_problem_uuid) {
                item.fire(`click`);
                item.fire('mouseover');
            }
        }, this);
    }

    element_or_marker_selected(data) {
        this.marker_array.forEach(function (item, index, array) {
            if (item.options.uuid === data.detail.local_problem_uuid) {
                if (item.selected !== "true") {
                    item.setIcon(this.marker_selected_icon);
                    item.selected = "true";
                    item.off('mouseover');
                    item.off('mouseout');
                    item.togglePopup();
                } else {
                    item.setIcon(this.marker_normal_icon);
                    item.selected = "false";
                    item.on('mouseover', function (e) {
                        this.openPopup();});
                    item.on('mouseout', function (e) {
                        this.closePopup();});
                    item.closePopup();
                }
            }
        }, this);
    }

}

customElements.define('l2-local-leaflet-map-list-problems', l2_local_leaflet_map_list_problems)