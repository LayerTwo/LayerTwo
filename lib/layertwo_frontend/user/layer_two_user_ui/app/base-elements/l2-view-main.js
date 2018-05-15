import { l2_view_nav } from "./l2-view-nav.js"
import { l2_view_stage } from "./l2-view-stage.js"


export class l2_view_main extends HTMLElement {
    constructor() {
        super();
        document.addEventListener(`l2-nav-button-clicked`, this.handle_clicked_event.bind(this), true);
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('name');

    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
    }

    initial_state() {
        if (sessionStorage.getItem(`l2-${this.section}-nav`) === this.sub_section) {
            this.state_show();
        } else {
            this.state_hide();
        }
    }

    handle_clicked_event(event) {
        if (event.detail.button_name === this.sub_section
            && event.detail.button_section === `${this.section}`) {
            this.state_show();
        } else if (event.detail.button_name !== this.sub_section
            && event.detail.button_section === `${this.section}`) {
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
        return `<l2-view-nav section="${this.section}" sub-section="${this.sub_section}"></l2-view-nav>
                <l2-view-stage section="${this.section}" sub-section="${this.sub_section}"></l2-view-stage>`;
    }

}

customElements.define('l2-view-main', l2_view_main)