import { l2_submit_problem_form } from './l2-submit-problem-form.js'

export class l2_edit_problem_form extends l2_submit_problem_form {
    constructor() {
        super();
        this.cancel_button_handler = this.cancel_button.bind(this);
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
        this.querySelector("#submit-form").addEventListener("submit", event => this.handle_submit_button_clicked(event));
        this.querySelector("#gps-button").addEventListener("pointerdown", this.gps_button_handler);
        this.querySelector("#latitude-input").addEventListener("input", this.gps_coords_change.bind(this));
        this.querySelector("#longitude-input").addEventListener("input", this.gps_coords_change.bind(this));
        this.querySelector('#submit-cancel-button').addEventListener("pointerdown", this.cancel_button_handler);
        this.querySelector("#photo-input").addEventListener("input", event => this.photo_input_change(event));
        this.querySelector("#remove-photo").addEventListener("pointerdown", this.remove_photo_handler);
        this.querySelector("#remove-photo").classList.add("hide-element");
    }

    cancel_button() {
        this.dispatchEvent(new CustomEvent("view-nav-mbox", {
            detail: {
                section: this.section,
                sub_section: this.sub_section,
                action: 'reset-default-view'
            },
            bubble: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent("button-mbox", {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`,
                action: 'hide-button'
            },
            bubble: true, composed: true
        }));
    }

    edit_complete(){
        this.dispatchEvent(new CustomEvent("view-nav-mbox", {
            detail: {
                section: this.section,
                sub_section: this.sub_section,
                element_uuid: this.element_uuid,
                action: 'reset-default-view-element-update'
            },
            bubble: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent("button-mbox", {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`,
                action: 'hide-button'
            },
            bubble: true, composed: true
        }));
    }

    add_mbox_listener() {
        document.addEventListener('edit-form-mbox', this.handle_mbox_message.bind(this), true);
    }

    handle_mbox_message(event) {
        if (event.detail.section === this.section
            && event.detail.sub_section === this.sub_section) {
            this.process_mbox_message(event);
        }
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'edit-entry':
                this.edit_entry(event);
                break;
            case 'update-accepted':
                this.handle_submit_success_constructor(event);
                break;
            case 'update-failed':
                this.handle_submit_failed_constructor('Entry Rejected.');
                break;
        }

    }

    edit_entry(event) {
        if (this.submit_success_element !== undefined) {
            this.submit_success_element.remove();
        }
        this.querySelector("#photo-input").value = "";
        this.element_uuid = event.detail.element_uuid;
        this.dom_parser = new DOMParser();
        this.querySelector("#title-input").value = this.dom_parser.parseFromString(event.detail.element_title, "text/html").body.innerText;
        this.querySelector("#importance-slider").value = parseInt(event.detail.element_importance);
        this.querySelector("#description-input").value = this.dom_parser.parseFromString(event.detail.element_description, "text/html").body.innerText;
        this.querySelector("#latitude-input").value = parseFloat(event.detail.element_latitude);
        this.querySelector("#longitude-input").value = parseFloat(event.detail.element_longitude);
        if(event.detail.element_photo !== null && event.detail.element_photo !== "none"){
            this.querySelector("#photo-display").setAttributeNS('http://www.w3.org/1999/xlink', 'href', "/uploads/"+event.detail.element_photo);
            this.querySelector("#remove-photo").classList.remove("hide-element");
            this.querySelector("#remove-photo").classList.add("show-element");
        } else {
            this.querySelector("#photo-display").setAttributeNS('http://www.w3.org/1999/xlink', 'href', "");
            this.querySelector("#remove-photo").classList.remove("show-element");
            this.querySelector("#remove-photo").classList.add("hide-element");
            this.querySelector("#svg-photo-placeholder").classList.remove("hide-element");
            this.querySelector("#svg-photo-placeholder").classList.add("show-element");
        }
        this.gps_coords_change();

        document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`
            }, bubble: true, composed: true
        }));

        document.dispatchEvent(new CustomEvent('button-mbox', {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`,
                action: 'show-button'
            }, bubble: true, composed: true
        }));
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
        this.querySelector("#submit-cancel-button").removeEventListener("pointerdown", this.cancel_button_handler);
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
        this.querySelector("#submit-cancel-button").disabled = true;
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
                        entry_uuid: this.element_uuid,
                        form_title: this.title_input,
                        importance_level: this.importance_level,
                        form_description: this.description_input,
                        form_photo: this.photo_base64,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        action: 'update-form'
                    },
                    bubble: true, composed: true
                }));
            }.bind(this);
        } else if(this.querySelector("#photo-input").value === "" && this.querySelector("#photo-display").getAttributeNS('http://www.w3.org/1999/xlink', 'href') !== ""){
            this.photo_base64 = "no-change";
            this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    view_name: this.view_name,
                    entry_uuid: this.element_uuid,
                    form_title: this.title_input,
                    importance_level: this.importance_level,
                    form_description: this.description_input,
                    form_photo: this.photo_base64,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    action: 'update-form'
                },
                bubble: true, composed: true
            }));
        } else {
            this.photo_base64 = "none";
            this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    view_name: this.view_name,
                    entry_uuid: this.element_uuid,
                    form_title: this.title_input,
                    importance_level: this.importance_level,
                    form_description: this.description_input,
                    form_photo: this.photo_base64,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    action: 'update-form'
                },
                bubble: true, composed: true
            }));
        };
    }

    handle_submit_success_constructor() {
        this.submit_success();
        this.submit_success_edit_form();
    }

    submit_success_edit_form() {
        this.querySelector("#submit-cancel-button").disabled = false;
        this.querySelector("#submit-cancel-button").addEventListener("pointerdown", this.cancel_button_handler);
        setTimeout(function () { this.edit_complete() }.bind(this), 500);
    }

    handle_submit_failed_constructor(reason) {
        this.handle_submit_failed(reason);
        this.submit_failed_edit_form();
    }

    submit_failed_edit_form() {
        this.querySelector("#submit-cancel-button").disabled = false;
        this.querySelector("#submit-cancel-button").addEventListener("pointerdown", this.cancel_button_handler);
    }

    html_submit_button() {
        return `
        <input id="submit-button" class='submit-form-submit-button' value="Update" type="submit"/>
        <input id="submit-cancel-button" class='submit-form-submit-cancel-button' value="Cancel" type="button"/>
        `;
    }

}

customElements.define('l2-edit-problem-form', l2_edit_problem_form)