import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_social_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_sections_nav_style(){
        return `<style>
        :host {
            flex-direction: column;
            background: white;
        }
        </style>`;
    }

    template() {
        return `
        <l2-sections-nav-button nav-section="l2-social-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Friends"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Channels"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Interests"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Views"></l2-sections-nav-button>
        ` + this.l2_sections_nav_style();
    }

}
customElements.define('l2-social-nav', l2_social_nav)