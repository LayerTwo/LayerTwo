import { l2_view_nav_button } from "../extended-elements/l2-view-nav-button.js"

export class l2_view_nav extends HTMLElement {
    constructor() {
        super();
        document.addEventListener('view-nav-mbox', this.handle_mbox_message.bind(this), true);
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');

    }

    handle_mbox_message(event) {
        if (event.detail.section === this.section
            && event.detail.sub_section === this.sub_section) {
            this.process_mbox_message(event);
        }
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'reset-default-view':
                this.reset_default_view();
                break;
            case 'reset-default-view-element-update-stage-2':
                this.reset_default_view_element_update_stage_2(event);
                break;
        }
    }

    reset_default_view() {
        this.default_button_name = this.querySelectorAll('l2-view-nav-button')[0].getAttribute('name');
        document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: `${this.default_button_name}`, button_section: `${this.section}-${this.sub_section}` }, bubble: true, composed: true }));
    }

    reset_default_view_element_update_stage_2(event) {
        this.default_button_name = this.querySelectorAll('l2-view-nav-button')[0].getAttribute('name');
        document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: `${this.default_button_name}`, button_section: `${this.section}-${this.sub_section}` }, bubble: true, composed: true }));
        document.dispatchEvent(new CustomEvent("list-element-mbox", {
            detail: {
                element_uuid: event.detail.element_uuid,
                action: 'update-element-create-marker'
            },
            bubble: true, composed: true
        }));
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.set_default_view();
    }

    set_default_view() {
        if (sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === null
            && this.querySelectorAll('l2-view-nav-button').length !== 0) {
            this.default_button_name = this.querySelectorAll('l2-view-nav-button')[0].getAttribute('name');
            document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: `${this.default_button_name}`, button_section: `${this.section}-${this.sub_section}` }, bubble: true, composed: true }));
        }
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `
        ${this.nav_selector()}`;
    }

    nav_selector() {
        switch (`${this.section}-${this.sub_section}`) {
            case "Local-Problems":
                return `
                <l2-view-nav-button section="${this.section}-${this.sub_section}" name="List Problems"></l2-view-nav-button>
                <l2-view-nav-button section="${this.section}-${this.sub_section}" display='false' name="Edit Problem"></l2-view-nav-button>
                <l2-view-nav-button section="${this.section}-${this.sub_section}" name="Submit Problem"></l2-view-nav-button>`;
                break;
            default:
                return ``;
        }
    }

}

customElements.define('l2-view-nav', l2_view_nav)