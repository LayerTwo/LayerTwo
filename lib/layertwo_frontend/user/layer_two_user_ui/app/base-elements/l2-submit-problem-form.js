export class l2_submit_problem_form extends HTMLElement {
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
        this.remove_photo_handler = this.remove_photo_clicked.bind(this);
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
        this.querySelector("#photo-input").addEventListener("input", event => this.photo_input_change(event));
        this.querySelector("#remove-photo").addEventListener("pointerdown", this.remove_photo_handler);
        this.querySelector("#remove-photo").classList.add("hide-element");
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
        this.querySelector("#photo-input").disabled = true;
        this.querySelector("#remove-photo").disabled = true;
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
        let FR = new FileReader();
        if (this.querySelector("#photo-input").value !== "") {
            FR.readAsDataURL(this.querySelector("#photo-input").files[0]);
            FR.onload = function () {
                this.photo_base64 = FR.result;
                this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
                    detail: {
                        section: this.section,
                        sub_section: this.sub_section,
                        view_name: this.view_name,
                        form_title: this.title_input,
                        importance_level: this.importance_level,
                        form_description: this.description_input,
                        form_photo: this.photo_base64,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        action: 'submit-form'
                    },
                    bubble: true, composed: true
                }));
            }.bind(this);
        } else {
            this.photo_base64 = "none";
            this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    view_name: this.view_name,
                    form_title: this.title_input,
                    importance_level: this.importance_level,
                    form_description: this.description_input,
                    form_photo: this.photo_base64,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    action: 'submit-form'
                },
                bubble: true, composed: true
            }));
        };
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
        this.querySelector("#photo-input").disabled = false;
        this.querySelector("#remove-photo").disabled = false;
        this.querySelector("#gps-button").disabled = false;
        this.querySelector("#latitude-input").disabled = false;
        this.querySelector("#longitude-input").disabled = false;
        this.querySelector("#submit-button").disabled = false;

        this.querySelector("#latitude-input").value = "";
        this.querySelector("#longitude-input").value = "";
        this.querySelector("#title-input").value = "";
        this.querySelector("#importance-slider").value = 0;
        this.querySelector("#description-input").value = "";

        this.querySelector("#photo-input").value = '';
        let svg_image = this.querySelector("#photo-display");
        this.querySelector("#svg-photo-placeholder").classList.remove("hide-element");
        this.querySelector("#svg-photo-placeholder").classList.add("show-element");
        svg_image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');

        this.querySelector("#remove-photo").classList.remove("show-element");
        this.querySelector("#remove-photo").classList.add("hide-element");

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
        this.querySelector("#photo-input").disabled = false;
        this.querySelector("#remove-photo").disabled = false;
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

    remove_photo_clicked(){
        this.querySelector("#photo-input").value = "";
        this.querySelector("#photo-display").setAttributeNS('http://www.w3.org/1999/xlink', 'href', '');
        this.querySelector("#remove-photo").classList.remove("show-element");
        this.querySelector("#remove-photo").classList.add("hide-element");
        this.querySelector("#svg-photo-placeholder").classList.remove("hide-element");
        this.querySelector("#svg-photo-placeholder").classList.add("show-element");
    }

    reset_local_marker() {
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
        navigator.geolocation.getCurrentPosition(position => this.add_lat_lng_to_form_inputs_from_gps_device(position), error => this.gps_error(gpserror), { enableHighAccuracy: true });
    }

    gps_error(gpserror) {
        console.log("GPS Error" + gpserror);
    }

    add_lat_lng_to_form_inputs_from_gps_device(position) {
        this.querySelector("#latitude-input").value = parseFloat(position.coords.latitude.toFixed(5));
        this.querySelector("#longitude-input").value = parseFloat(position.coords.longitude.toFixed(5));
        this.gps_coords_change();
    }

    photo_input_change(event) {
        let svg_image = this.querySelector("#photo-display");
        this.querySelector("#svg-photo-placeholder").classList.remove("show-element");
        this.querySelector("#svg-photo-placeholder").classList.add("hide-element");
        svg_image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', window.URL.createObjectURL(event.target.files[0]));
        this.querySelector("#remove-photo").classList.remove("hide-element");
        this.querySelector("#remove-photo").classList.add("show-element");
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
        ${this.html_photo_text()}
        ${this.html_photo_input()}
        ${this.html_photo_display()}
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

    html_photo_text() {
        return `
        <div id="photo-text" class="submit-form-photo-text">Add photo:</div>
        `
    }

    html_photo_input() {
        return `
        <input id="photo-input" class="submit-form-photo-input" type="file" accept="image/*" capture disabled>
        `
    }

    html_photo_display() {
        return `
        <div class="submit-form-photo-container">
        <svg class="svg-photo-display" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <svg id="svg-photo-placeholder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m401.94 543.64c-.422-.413-.932-.619-1.528-.619h-1.892l-.431-1.122c-.107-.27-.303-.502-.587-.697-.284-.195-.576-.293-.874-.293h-4.324c-.298 0-.59.098-.874.293-.284.195-.48.428-.587.697l-.431 1.122h-1.892c-.597 0-1.106.206-1.529.619-.422.413-.633.911-.633 1.494v7.395c0 .583.211 1.081.633 1.494.422.413.932.619 1.529.619h11.89c.597 0 1.106-.206 1.528-.619.422-.413.633-.911.633-1.494v-7.395c0-.583-.211-1.081-.633-1.494m-4.801 7.804c-.74.724-1.631 1.085-2.673 1.085-1.042 0-1.932-.362-2.673-1.085-.74-.724-1.111-1.594-1.111-2.612 0-1.018.37-1.889 1.111-2.612.74-.724 1.631-1.085 2.673-1.085 1.042 0 1.932.362 2.673 1.085.74.724 1.111 1.594 1.111 2.612 0 1.018-.37 1.889-1.111 2.612m-2.673-4.989c-.67 0-1.243.232-1.719.697-.476.465-.714 1.025-.714 1.68 0 .655.238 1.215.714 1.68.476.465 1.049.697 1.719.697.67 0 1.243-.232 1.719-.697.476-.465.714-1.025.714-1.68 0-.655-.238-1.215-.714-1.68-.476-.465-1.049-.697-1.719-.697" transform="matrix(.78637 0 0 .78395-302.25-421.36)" fill="#e9e9e9"/></svg>
        <image id="photo-display" class="submit-form-photo-display" width="100%" height="100%"/>
        </svg>
        <input id="remove-photo" class="form-remove-photo" type="button" value="Remove Photo">
        </div>
        `
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
        <div id="gps-text" class='submit-form-gps-text'><input id="gps-button" class='submit-form-gps-button' type="button" value="Device GPS"> or select from the Map</div>
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

customElements.define('l2-submit-problem-form', l2_submit_problem_form)