import { l2_leaflet_map } from "./l2-leaflet-map.js"
import { l2_list_container } from "./l2-list-container.js"
import { l2_list_count } from "./l2-list-count.js"

export class l2_stage_list_and_projects extends HTMLElement {
    constructor() {
        super();
        document.addEventListener(`project-and-map-mbox`, this.handle_mbox_message.bind(this), true);
        document.addEventListener(`l2-nav-button-clicked`, this.handle_clicked_event.bind(this), true);
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');
        this.view_name = this.getAttribute('view');
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
    }

    handle_mbox_message(event) {
        if (event.detail.list_and_map_name === this.view_name
            && event.detail.list_and_map_section === `${this.section}-${this.sub_section}`) {
            this.process_mbox_message(event);
        }
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'scroll-to-element':
                this.scroll_to_element(event);
                break;
        }
    }

    scroll_to_element(event){
      this.querySelector("#list-container").scrollTop = event.detail.element_offset;
    }

    initial_state() {
        if (sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name) {
            this.state_show();
        } else {
            this.state_hide();
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
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `
        <div class="list-map-count-and-heading-container">
        ${this.html_heading()}
        ${this.html_count()}
        </div>
        <div id='list-container' class="list-projects-list-container">
        ${this.html_list_display()}
        </div>
        <div class="list-projects-steps-heading-container">
        ${this.html_steps_heading()}
        </div>
        <div id='steps-container' class="list-projects-steps-container">
        ${this.html_steps_display()}
        </div>
        <div class="list-projects-map-container">
        ${this.html_map()}
        </div>`;
    }

    html_heading() {
        return `
        <div class="list-map-heading">${this.section} ${this.sub_section} List</div>`;
    }

    html_steps_heading() {
        return `
        <div class="list-projects-steps-heading">Project Solutions</div>`;
    }

    html_count() {
        return `
        <l2-list-count section="${this.section}" sub-section="${this.sub_section}" view="${this.view_name}"></l2-list-count>`;
    }

    html_list_display() {
        return `<l2-list-container section="${this.section}" sub-section="${this.sub_section}" view="${this.view_name}"></l2-list-container>`;
    }

    html_steps_display() {
        return `<l2-steps-list-container section="${this.section}" sub-section="${this.sub_section}" view="${this.view_name}"></l2-steps-list-container>`;
    }

    html_map() {
        return `<l2-leaflet-map section="${this.section}" sub-section="${this.sub_section}" view="${this.view_name}"></l2-leaflet-map>`;
    }

}

customElements.define("l2-stage-list-and-projects", l2_stage_list_and_projects)
