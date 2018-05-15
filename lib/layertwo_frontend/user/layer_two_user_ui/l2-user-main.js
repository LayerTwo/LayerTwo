import { l2_main_nav } from "./app/base-elements/l2-main-nav.js"
import { l2_main_stage } from "./app/base-elements/l2-main-stage.js"
import { l2_main_copyright } from "./app/base-elements/l2-main-copyright.js"
import { l2_main_websocket } from "./app/websocket/l2-main-websocket.js"
import { l2_exit_confirm } from "./app/base-elements/l2-exit-confirm.js"

export class l2_user_main extends HTMLElement {
    constructor() {
        super();
        document.addEventListener(`l2-nav-button-clicked`, this.handle_clicked_event.bind(this), true);
    }

    // Fixes Leaflet map render problems, invalidateSize() doesn't work in certain cases.
    handle_clicked_event(event) {
        if (event.detail.button_section.includes('Local')
            || event.detail.button_section.includes('City')
            || event.detail.button_section.includes('Country')
            || event.detail.button_section.includes('Visit')
            || event.detail.button_name === 'Local'
            || event.detail.button_name === 'City'
            || event.detail.button_name === 'Country'
            || event.detail.button_name === 'Visit') {
            window.dispatchEvent(new Event('resize')); // <-
        }
    }

    connectedCallback() {
        this.innerHTML = this.template();
        // Fixes Leaflet map render problems
        window.dispatchEvent(new Event('resize'));
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `
        <l2-main-nav></l2-main-nav>
        <l2-main-stage></l2-main-stage>
        <l2-main-copyright></l2-main-copyright>
        <l2-main-websocket></l2-main-websocket>
        <l2-exit-confirm></l2-exit-confirm>`;
    }
}
customElements.define('l2-user-main', l2_user_main)
