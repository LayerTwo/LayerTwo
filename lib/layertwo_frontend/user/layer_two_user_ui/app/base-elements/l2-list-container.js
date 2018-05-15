import { l2_list_element } from "./l2-list-element.js"


export class l2_list_container extends HTMLElement {
    constructor() {
        super();
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');
        this.view_name = this.getAttribute('view');
        document.addEventListener('list-container-mbox', this.handle_mbox_message.bind(this), true);
        document.addEventListener('channel-ready', this.handle_channel_ready.bind(this), true);
        document.addEventListener(`l2-nav-button-clicked`, this.handle_clicked_event.bind(this), true);
        document.addEventListener('ws-request-failed', this.handle_ws_request_failed.bind(this), true);
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.list_container = this.querySelector('#elements-list');
        this.list_container.classList.add('l2-elements-list');
        this.list_container_init();
    }

    handle_mbox_message(event) {
        if (event.detail.list_container_name === this.view_name
            && event.detail.list_container_section === `${this.section}-${this.sub_section}`) {
            this.process_mbox_message(event);
        }
    }

    handle_clicked_event(event) {
        if (event.detail.button_section === this.section
            && event.detail.button_name === this.sub_section
            && sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name
            || event.detail.button_section === `${this.section}-${this.sub_section}`
            && event.detail.button_name === this.view_name) {
            if (this.list_container.childElementCount === 0) {
                this.list_request();
            }
        }
    }

    handle_ws_request_failed(event) {
        if (event.detail.event.detail.view_name === this.view_name
            && event.detail.event.detail.section === this.section) {
            this.handle_list_request_failed();
        }
    }

    handle_list_request_failed() {
        this.list_container.innerHTML = 'List Request Failed.';
    }

    list_container_init() {
        if (sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name) {
            this.list_request();
        }
    }

    handle_channel_ready(event) {
        if (event.detail.channel === this.section) {
            if (sessionStorage.getItem(`l2-${this.section}-nav`) === this.sub_section
                && sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name) {
                this.list_request();
            }
        }
    }

    list_request() {
        document.dispatchEvent(new CustomEvent("ws-channel-mbox", { detail: { view_name: this.view_name, section: this.section, action: 'list-request' }, bubble: true, composed: true }));
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'create-list':
                this.create_list(event);
                break;
            case 'delete-element':
                this.delete_element(event);
                break;
            case 'scroll-to-element':
                this.scroll_to_element(event);
                break;
        }
    }

    create_list(event) {
        if (event.detail.list.length === 0) {
            this.list_container.innerHTML = "";
        } else {
            if (this.list_container.childElementCount === 0) {
                this.list_container.innerHTML = "";
                for (let i = 0; i < event.detail.list.length; i++) {
                        this.list_container.appendChild(this.create_list_element(event.detail.list[i]));
                        this.create_map_marker(event.detail.list[i]);
                }
            } else {
                for (let i = 0; i < event.detail.list.length; i++) {
                    if (this.querySelector(`l2-list-element[element-uuid="${event.detail.list[i]["ListElement.element_uuid"]}"]`) === null) {
                        this.list_container.prepend(this.create_list_element(event.detail.list[i]));
                        this.create_map_marker(event.detail.list[i]);
                    }
                }
            }
        }
    }

    create_list_element(event) {
        let element = document.createElement("l2-list-element");
        element.setAttribute("element-uuid", event["ListElement.element_uuid"]);
        element.setAttribute("element-title", event["ListElement.element_title"]);
        element.setAttribute("element-importance", event["ListElement.element_importance"]);
        element.setAttribute("element-latitude", event["ListElement.element_latitude"]);
        element.setAttribute("element-longitude", event["ListElement.element_longitude"]);
        element.setAttribute("element-timestamp", event["ListElement.timestamp"]);
        element.setAttribute("element-author", event["ListElement.author"]);
        element.setAttribute("element-section", this.section);
        element.setAttribute("element-sub-section", this.sub_section);
        element.setAttribute("element-view-name", this.view_name);
        return element;
    }

    create_map_marker(event) {
        this.dispatchEvent(new CustomEvent("leaflet-map-mbox", {
            detail: {
                map_view: this.view_name,
                map_section: `${this.section}-${this.sub_section}`,
                action: 'create-marker',
                element_uuid: event["ListElement.element_uuid"],
                element_title: event["ListElement.element_title"],
                element_latitude: event["ListElement.element_latitude"],
                element_longitude: event["ListElement.element_longitude"]
            }, bubble: true, composed: true
        }));
    }

    delete_element(event) {
        this.db_element_uuid = event.detail.element_uuid;
        if (this.list_container.querySelector(`l2-list-element[local-problem-uuid="${this.db_element_uuid}"]`) !== null) {
            this.dispatchEvent(new CustomEvent("l2-delete-list-element", { detail: { element_uuid: this.db_element_uuid }, bubble: true, composed: true }));
        }
    }

    scroll_to_element(event) {
        this.element_uuid = event.detail.element_uuid;
        this.first_child_offset = this.list_container.firstElementChild.offsetTop;
        this.element_offset = this.list_container.querySelector(`l2-list-element[element-uuid="${this.element_uuid}"]`).offsetTop - this.first_child_offset;
        this.dispatchEvent(new CustomEvent("list-and-map-mbox", { detail: { list_and_map_name: this.view_name, list_and_map_section: `${this.section}-${this.sub_section}`, element_offset: this.element_offset, action: 'scroll-to-element' }, bubble: true, composed: true }));
    }

    template() {
        return `
        ${this.html_constructor()}`;
    }

    html_constructor() {
        return `
        <div id="elements-list">Please Wait.</div>
        `;
    }

}

customElements.define('l2-list-container', l2_list_container)