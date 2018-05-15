import { l2_leaflet_map } from './l2-leaflet-map.js'

export class l2_submit_form extends HTMLElement {
    constructor() {
        super();
        this.add_mbox_listener();
        document.addEventListener('leaflet-map-clicked', this.handle_map_clicked.bind(this), true);
        document.addEventListener('ws-request-failed', this.handle_ws_request_failed.bind(this), true);
        document.addEventListener('l2-nav-button-clicked', this.handle_clicked_event.bind(this), true);
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');
        this.view_name = this.getAttribute('view');
        this.form_display = this.getAttribute('display');
        this.gps_button_handler = this.gps_coordinates_from_device.bind(this);
    }

    add_mbox_listener() {
        document.addEventListener('submit-form-mbox', this.handle_mbox_message.bind(this), true);
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
        this.querySelector("#submit-form").addEventListener("submit", event => this.handle_submit_button_clicked(event));
        this.querySelector("#gps-button").addEventListener("pointerdown", this.gps_button_handler);
        this.querySelector("#latitude-input").addEventListener("input", this.gps_coords_change.bind(this));
        this.querySelector("#longitude-input").addEventListener("input", this.gps_coords_change.bind(this));
    }

    initial_state() {
        this.create_entity_map_marker();
        if (sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name
            && this.form_display !== 'false') {
            this.state_show();
        } else if (this.form_display === 'false') {
            this.dispatchEvent(new CustomEvent("view-nav-mbox", {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    action: 'reset-default-view'
                },
                bubble: true, composed: true
            }));
        } else {
            this.state_hide();
        }
    }

    handle_mbox_message(event) {
        if (event.detail.view_name === this.view_name
            && event.detail.section === this.section
            && event.detail.sub_section === this.sub_section) {
            this.process_mbox_message(event);
        }
    }

    create_entity_map_marker() {
        if (sessionStorage.getItem('entity_basic_info_version') !== null) {
            this.dispatchEvent(new CustomEvent("leaflet-map-mbox", {
                detail: {
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'create-location-marker',
                    latitude: parseFloat(sessionStorage.getItem('entity_latitude')),
                    longitude: parseFloat(sessionStorage.getItem('entity_longitude'))
                },
                bubble: true, composed: true
            }));
        }
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'entry-rejected':
                this.handle_submit_failed('Entry Rejected.');
                break;
            case 'entry-accepted':
                this.handle_submit_success_constructor();
                break;
            case 'create-location-marker':
                this.handle_create_location_marker();
                break;
        }
    }

    handle_submit_button_clicked(event) {
        event.preventDefault();
        this.querySelector("#title-input").disabled = true;
        this.querySelector("#importance-slider").disabled = true;
        this.querySelector("#description-input").disabled = true;
        this.querySelector("#gps-button").disabled = true;
        this.querySelector("#gps-button").removeEventListener("pointerdown", this.gps_button_handler);
        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
            {
                detail: {
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'disable-marker-location-change'
                },
                bubble: true, composed: true
            }));
        this.querySelector("#latitude-input").disabled = true;
        this.querySelector("#longitude-input").disabled = true;
        this.querySelector("#submit-button").disabled = true;
        this.submit();
    }

    submit() {
        this.title_input = this.querySelector("#title-input").value;
        this.importance_level = this.querySelector("#importance-slider").value;
        this.description_input = this.querySelector("#description-input").value;
        this.latitude = this.querySelector("#latitude-input").value;
        this.longitude = this.querySelector("#longitude-input").value;
        this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
            detail: {
                section: this.section,
                sub_section: this.sub_section,
                view_name: this.view_name,
                form_title: this.title_input,
                importance_level: this.importance_level,
                form_description: this.description_input,
                latitude: this.latitude,
                longitude: this.longitude,
                action: 'submit-form'
            },
            bubble: true, composed: true
        }));
    }

    handle_ws_request_failed(event) {
        if (event.detail.event.detail.view_name === this.view_name
            && event.detail.event.detail.section === this.section
            && this.sub_section === this.sub_section) {
            this.handle_submit_failed_constructor('Request Failed.');
        }
    }

    handle_submit_success_constructor() {
        this.submit_success();
        this.reset_local_marker();
    }

    submit_success() {
        this.querySelector("#title-input").disabled = false;
        this.querySelector("#importance-slider").disabled = false;
        this.querySelector("#description-input").disabled = false;
        this.querySelector("#gps-button").disabled = false;
        this.querySelector("#latitude-input").disabled = false;
        this.querySelector("#longitude-input").disabled = false;
        this.querySelector("#submit-button").disabled = false;

        this.querySelector("#latitude-input").value = "";
        this.querySelector("#longitude-input").value = "";
        this.querySelector("#title-input").value = "";
        this.querySelector("#importance-slider").value = 0;
        this.querySelector("#description-input").value = "";

        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
            {
                detail: {
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'enable-marker-location-change'
                },
                bubble: true, composed: true
            }));
        this.submit_success_element = document.createElement("div");
        this.submit_success_element.setAttribute("id", "submit-success-text");
        this.submit_success_element.setAttribute("class", "submit-form-submit-success-text");
        this.submit_success_element.innerHTML = 'Entry Accepted';
        if (this.entry_result === undefined) {
            this.querySelector("#submit-result").appendChild(this.submit_success_element);
            this.entry_result = "accepted";
        } else if (this.entry_result === "failed") {
            this.querySelector("#submit-failed-text").remove();
            this.querySelector("#submit-result").appendChild(this.submit_success_element);
            this.entry_result = "accepted";
        }
    }

    handle_submit_failed_constructor(reason) {
        this.handle_submit_failed(reason);
    }

    handle_submit_failed(reason) {
        this.querySelector("#title-input").disabled = false;
        this.querySelector("#importance-slider").disabled = false;
        this.querySelector("#description-input").disabled = false;
        this.querySelector("#gps-button").disabled = false;
        this.querySelector("#gps-button").addEventListener("pointerdown", this.gps_button_handler);
        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
            {
                detail: {
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'enable-marker-location-change'
                },
                bubble: true, composed: true
            }));
        this.querySelector("#latitude-input").disabled = false;
        this.querySelector("#longitude-input").disabled = false;
        this.querySelector("#submit-button").disabled = false;

        this.submit_failed_element = document.createElement("div");
        this.submit_failed_element.setAttribute("id", "submit-failed-text");
        this.submit_failed_element.setAttribute('class', 'submit-form-submit-failed-text');
        this.submit_failed_element.innerHTML = reason;
        if (this.entry_result === undefined) {
            this.querySelector("#submit-result").appendChild(this.submit_failed_element);
            this.entry_result = "failed";
        } else if (this.entry_result === 'failed'
            && this.querySelector("#submit-failed-text").innerHTML !== reason) {
            this.querySelector("#submit-failed-text").innerHTML = reason;
        } else if (this.entry_result === "accepted") {
            this.querySelector("#submit-success-text").remove();
            this.querySelector("#submit-result").appendChild(this.submit_failed_element);
            this.entry_result = "failed";
        }
    }

    handle_create_location_marker() {
        this.create_entity_map_marker();
    }

    reset_local_marker(){
        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
        {
            detail: {
                map_section: `${this.section}-${this.sub_section}`,
                map_view: this.view_name,
                action: 'reset-local-marker'
            },
            bubble: true, composed: true
        }));
    }

    gps_coordinates_from_device() {
        navigator.geolocation.getCurrentPosition(position => this.add_lat_lng_to_form_inputs_from_gps_device(position));
    }

    add_lat_lng_to_form_inputs_from_gps_device(position) {
        this.querySelector("#latitude-input").value = parseFloat(position.coords.latitude.toFixed(5));
        this.querySelector("#longitude-input").value = parseFloat(position.coords.longitude.toFixed(5));
        this.gps_coords_change();
    }

    gps_coords_change() {
        this.manual_latitude = this.querySelector("#latitude-input").value;
        this.manual_longitude = this.querySelector("#longitude-input").value;
        if (this.manual_latitude !== ""
            && this.manual_longitude !== "") {
            this.dispatchEvent(new CustomEvent("leaflet-map-mbox", {
                detail: {
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'update-marker',
                    latitude: this.manual_latitude,
                    longitude: this.manual_longitude
                },
                bubble: true, composed: true
            }));
        }
    }

    handle_map_clicked(event) {
        if (event.detail.map_view_name === this.view_name
            && `${event.detail.map_section}-${event.detail.map_sub_section}` === `${this.section}-${this.sub_section}`) {
            this.querySelector("#latitude-input").value = parseFloat(event.detail.latitude.toFixed(5));
            this.querySelector("#longitude-input").value = parseFloat(event.detail.longitude.toFixed(5));
        }
    }

    handle_clicked_event(event) {
        if (event.detail.button_name === this.view_name
            && event.detail.button_section === `${this.section}-${this.sub_section}`) {
            this.state_show();
        } else if (event.detail.button_name !== this.view_name
            && event.detail.button_section === `${this.section}-${this.sub_section}`) {
            this.state_hide();
        }
    }

    state_show() {
        this.classList.remove('hide-element');
        this.classList.add('show-element-grid');
    }

    state_hide() {
        this.classList.remove('show-element-grid');
        this.classList.add('hide-element');
    }

    template() {
        return `
        ${this.html_constructor()}`;
    }

    html_constructor() {
        return `
        <div id="form-container" class='submit-form-container'>
        <form id="submit-form" class='submit-form'>
        ${this.html_form_heading()}
        ${this.html_submission_title()}
        ${this.html_title_input()}
        ${this.html_importance_background()}
        ${this.html_importance_heading()}
        ${this.html_importance_slider()}
        ${this.html_importance_level_titles()}
        ${this.html_description_heading()}
        ${this.html_description_input()}
        ${this.html_location_heading()}
        ${this.html_latitude_heading()}
        ${this.html_latitude_input()}
        ${this.html_longitude_heading()}
        ${this.html_longitude_input()}
        ${this.html_gps_text_and_button()}
        <div id="submit-button-container" class='submit-form-submit-button-container'>
        ${this.html_submit_button()}
        ${this.html_submit_result()}
        </div>
        </form>
        </div>
        <div id="leaflet-map-container">
        <l2-leaflet-map section='${this.section}' sub-section='${this.sub_section}' view='${this.view_name}'></l2-leaflet-map>
        </div>
        `;
    }

    html_form_heading() {
        return `
        <div id="submit-form-heading" class='submit-form-heading'>${this.view_name}</div>
        `;
    }

    html_submission_title() {
        return `
        <div id="submission-title" class='submit-form-submission-title'>Title:</div>
        `;
    }

    html_title_input() {
        return `
        <input id="title-input" class='submit-form-title-input' required type="text">
        `;
    }

    html_importance_background() {
        return `
        <div id="importance-background" class='submit-form-importance-background'></div>
        `;
    }

    html_importance_heading() {
        return `
        <div id="importance-heading" class='submit-form-importance-heading'>Importance:</div>
        `;
    }

    html_importance_slider() {
        return `
        <input id="importance-slider" class='submit-form-importance-slider' type="range" min="0" max="4" step="1" value="0">
        `;
    }

    html_importance_level_titles() {
        return `
        <div id="importance-level-titles" class='submit-form-importance-level-titles'>
        <div>Neutral</div>
        <div>Low</div>
        <div>Medium</div>
        <div>High</div>
        <div>Critical</div>
        </div>
        `;
    }

    html_description_heading() {
        return `
        <div id="description-heading" class='submit-form-description-heading'>Description:</div>
        `;
    }

    html_description_input() {
        return `
        <textarea id="description-input" class='submit-form-description-input' rows="4" required></textarea>
        `;
    }

    html_location_heading() {
        return `
        <div id="location-heading" class='submit-form-location-heading'>Location:</div>
        `;
    }

    html_latitude_heading() {
        return `
        <div id="latitude-heading" class='submit-form-latitude-heading'>Latitude:</div>
        `;
    }

    html_latitude_input() {
        return `
        <input id="latitude-input" class='submit-form-latitude-input' step="0.000001" min="-90" max="90" placeholder="00.00000" required type="number">
        `;
    }

    html_longitude_heading() {
        return `
        <div id="longitude-heading" class='submit-form-longitude-heading'>Longitude:</div>
        `;
    }

    html_longitude_input() {
        return `
        <input id="longitude-input" class='submit-form-longitude-input' step="0.000001" min="-180" max="180" placeholder="000.00000" required type="number">
        `;
    }

    html_gps_text_and_button() {
        return `
        <div id="gps-text" class='submit-form-gps-text'>Select from the Map or use <input id="gps-button" class='submit-form-gps-button' type="button" value="GPS From Device"></div>
        `;
    }

    html_submit_button() {
        return `
        <input id="submit-button" class='submit-form-submit-button' value="Submit" type="submit"/>
        `;
    }

    html_submit_result() {
        return `
        <div id="submit-result" class='submit-form-submit-result'></div>
        `;
    }
}

customElements.define('l2-submit-form', l2_submit_form)