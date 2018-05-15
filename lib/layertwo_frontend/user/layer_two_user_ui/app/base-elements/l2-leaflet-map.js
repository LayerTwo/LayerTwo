import L from 'leaflet'

export class l2_leaflet_map extends HTMLElement {
	constructor() {
		super();
		this.section = this.getAttribute('section');
		this.sub_section = this.getAttribute('sub-section');
		this.view_name = this.getAttribute('view');
		this.map_state = 'hidden';
		document.addEventListener('l2-update-entity-basic-info', this.map_selector.bind(this), true);
		document.addEventListener('leaflet-map-mbox', this.handle_mbox_message.bind(this), true);
		this.marker_array = [];
		// Tile Gap Fix
		var originalInitTile = L.GridLayer.prototype._initTile;
		L.GridLayer.include({ _initTile: function (tile) { originalInitTile.call(this, tile); var tileSize = this.getTileSize(); tile.style.width = tileSize.x + 1 + 'px'; tile.style.height = tileSize.y + 1 + 'px'; } });
	}

	connectedCallback() {
		this.innerHTML = this.template();
		this.leaflet_map_clicked_handler = this.leaflet_map_clicked.bind(this);
		if (sessionStorage.getItem('entity_basic_info_version') !== null) {
			this.map_selector();
		}
	}

	handle_mbox_message(event) {
		if (event.detail.map_view === this.view_name
			&& event.detail.map_section === `${this.section}-${this.sub_section}`) {
			this.process_mbox_message(event);
		}
	}

	process_mbox_message(event) {
		switch (event.detail.action) {
			case 'create-marker':
				this.create_marker(event);
				break;
			case 'delete-marker':
				this.delete_marker(event);
				break;
			case 'disable-marker':
				this.disable_marker(event);
				break;
			case 'enable-marker':
				this.enable_marker(event);
				break;
			case 'select-marker':
				this.select_marker(event);
				break;
			case 'update-marker':
				this.update_marker(event);
				break;
			case 'reset-local-marker':
				this.reset_local_marker(event);
				break;
			case 'set-map-view':
				this.set_map_view(event);
				break;
			case 'create-location-marker':
				this.create_location_marker(event);
				break;
			case 'disable-marker-location-change':
				this.disable_marker_location_change(event);
				break;
			case 'enable-marker-location-change':
				this.enable_marker_location_change(event);
				break;
		}
	}

	map_selector() {
		switch (this.section) {
			case 'Local':
				this.local_map();
				break;
			case 'City':
				this.city_map();
				break;
			case 'Country':
				this.country_map();
				break;
			case 'Visit':
				this.visit_map();
				break;
		}
	}

	local_map() {
		this.construct_map();
		this.set_map_view_local();
		this.entity_latitude = sessionStorage.getItem('entity_latitude');
		this.entity_longitude = sessionStorage.getItem('entity_longitude');
		L.polygon([
			[parseFloat(this.entity_latitude) + 0.00075, parseFloat(this.entity_longitude) - 0.00100],
			[parseFloat(this.entity_latitude) + 0.00075, parseFloat(this.entity_longitude) + 0.00100],
			[parseFloat(this.entity_latitude) - 0.00075, parseFloat(this.entity_longitude) + 0.00100],
			[parseFloat(this.entity_latitude) - 0.00075, parseFloat(this.entity_longitude) - 0.00100]],
			{ fillOpacity: 0 }).addTo(this.leaflet_map);
		if (this.location_marker === undefined) {
			this.dispatchEvent(new CustomEvent("submit-form-mbox", {
				detail: {
					section: this.section,
					sub_section: this.sub_section,
					view_name: this.view_name,
					action: 'create-location-marker'
				},
				bubble: true, composed: true
			}));
		}
	}

	city_map() {
		this.construct_map();
		this.set_map_view_city();
	}

	country_map() {
		this.construct_map();
		this.set_map_view_country();
	}

	visit_map() {
		this.construct_map();
		this.set_map_view_visit();
	}

	construct_map() {
		this.render_template();
		this.set_marker_icons();
		this.map_container = this.querySelector('#leaflet-map');
		this.map_container.classList.add('l2-leaflet-map');
		this.leaflet_map = L.map(this.map_container);
		L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
			{
				attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
			}).addTo(this.leaflet_map);
		this.leaflet_map.on('click', this.leaflet_map_clicked_handler);
	}

	leaflet_map_clicked(event) {
		this.dispatchEvent(new CustomEvent("leaflet-map-clicked", {
			detail: {
				map_section: this.section,
				map_sub_section: this.sub_section,
				map_view_name: this.view_name,
				latitude: event.latlng.lat,
				longitude: event.latlng.lng
			},
			bubble: true, composed: true
		}));
		this.update_marker({
			detail: {
				latitude: event.latlng.lat,
				longitude: event.latlng.lng
			}
		});
	}

	set_map_view_local() {
		if (sessionStorage.getItem('entity_latitude') !== null && sessionStorage.getItem('entity_longitude') !== null) {
			this.leaflet_map.setView([parseFloat(sessionStorage.getItem('entity_latitude')),
			parseFloat(sessionStorage.getItem('entity_longitude'))],
				parseInt(sessionStorage.getItem('city_local_default_zoom')));
		}
	}

	set_map_view_city() {
		if (sessionStorage.getItem('city_latitude') !== null && sessionStorage.getItem('city_longitude') !== null) {
			this.leaflet_map.setView([sessionStorage.getItem('city_latitude'),
			sessionStorage.getItem('city_longitude')],
				parseInt(sessionStorage.getItem('city_default_zoom')));
		}
	}

	set_map_view_country() {
		if (sessionStorage.getItem('country_latitude') !== null && sessionStorage.getItem('country_longitude') !== null) {
			this.leaflet_map.setView([sessionStorage.getItem('country_latitude'),
			sessionStorage.getItem('country_longitude')],
				parseInt(sessionStorage.getItem('country_default_zoom')));
		}
	}

	set_map_view_visit() {

	}

	set_marker_icons() {
		this.marker_selected_icon = L.icon({
			iconUrl: '/images/marker-icon-red.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [-3, -76],
			shadowUrl: '/images/marker-shadow.png',
			shadowSize: [41, 41],
			shadowAnchor: [12, 41],
			popupAnchor: [0, -60]
		});
		this.marker_normal_icon = L.icon({
			iconUrl: '/images/marker-icon.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [-3, -76],
			shadowUrl: '/images/marker-shadow.png',
			shadowSize: [41, 41],
			shadowAnchor: [12, 41],
			popupAnchor: [0, -60]
		});
	}

	create_marker(event) {
		let new_marker = L.marker([parseFloat(event.detail.element_latitude),
		parseFloat(event.detail.element_longitude)],
			{
				icon: this.marker_normal_icon,
				uuid: event.detail.element_uuid
			});
		new_marker.on('mouseover', function (e) { this.openPopup(); });
		new_marker.on('mouseout', function (e) { this.closePopup(); });
		new_marker.on('click', function (e) {
			this.dispatchEvent(new CustomEvent('list-element-mbox',
				{
					detail: {
						action: 'select-and-scroll',
						element_uuid: event.detail.element_uuid
					},
					bubble: true, composed: true
				}));
		}.bind(this));
		new_marker.bindPopup(event.detail.element_title, { autoClose: false, autoPan: false });
		new_marker.addTo(this.leaflet_map);
		this.marker_array.push(new_marker);

		this.dispatchEvent(new CustomEvent('map-marker-created', { detail: { marker_uuid: event.detail.element_uuid }, bubble: true, composed: true }));
	}

	delete_marker(event) {
		this.marker_array.forEach(function (item, index, array) {
			if (item.options.uuid === event.detail.element_uuid) {
				item.remove();
				this.marker_array.splice(index, 1);
			}
		}, this);
	}

	disable_marker(event) {
		this.marker_array.forEach(function (item, index, array) {
			if (item.options.uuid === event.detail.element_uuid) {
				item.off('click');
			}
		}, this);
	}

	select_marker(event) {
		this.marker_array.forEach(function (item, index, array) {
			if (item.options.uuid === event.detail.element_uuid) {
				if (item.selected !== 'true') {
					item.setIcon(this.marker_selected_icon);
					item.selected = 'true';
					item.off('mouseover');
					item.off('mouseout');
					item.togglePopup();
				} else {
					item.setIcon(this.marker_normal_icon);
					item.selected = 'false';
					item.on('mouseover', function (e) {
						this.openPopup();
					});
					item.on('mouseout', function (e) {
						this.closePopup();
					});
					item.closePopup();
				}
			}
		}, this);
	}

	update_marker(event) {
		if (this.location_marker !== undefined) {
			this.location_marker.setLatLng([parseFloat(event.detail.latitude).toFixed(5),
			parseFloat(event.detail.longitude).toFixed(5)]).update();
		}
	}

	enable_marker(event) {
		this.marker_array.forEach(function (item, index, array) {
			if (item.options.uuid === event.detail.element_uuid) {
				item.on('click', function (e) {
					this.dispatchEvent(new CustomEvent('list-element-mbox',
						{
							detail: {
								action: 'select-and-scroll',
								element_uuid: event.detail.element_uuid
							},
							bubble: true, composed: true
						}));
				}.bind(this));
			}
		}, this);
	}

	create_location_marker(event) {
		if (this.location_marker === undefined) {
			this.location_marker = L.marker([event.detail.latitude,
			event.detail.longitude],
				{
					icon: this.marker_normal_icon
				});
			this.location_marker.addTo(this.leaflet_map);
		}
	}

	disable_marker_location_change(event) {
		this.leaflet_map.off('click');
	}

	enable_marker_location_change(event) {
		this.leaflet_map.on('click', this.leaflet_map_clicked_handler);
	}

	reset_local_marker(event) {
		if (this.location_marker !== undefined) {
			this.location_marker.setLatLng([parseFloat(sessionStorage.getItem("entity_latitude")),
			parseFloat(sessionStorage.getItem("entity_longitude"))],
				{ icon: this.marker_normal_icon });
		}
	}

	template() {
		return `
		<template>
        ${this.html_constructor()}
        </template>`;
	}

	render_template() {
		let content = document.importNode(this.querySelector('template').content, true);
		this.appendChild(content);
	}

	html_constructor() {
		return `
        <div id='leaflet-map'></div>
        `;
	}

}

customElements.define('l2-leaflet-map', l2_leaflet_map)
