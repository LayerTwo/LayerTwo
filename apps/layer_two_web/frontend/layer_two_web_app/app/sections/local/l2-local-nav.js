import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_local_nav extends HTMLElement {
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
        <l2-sections-nav-button nav-section="l2-local-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Businesses"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Authorities"></l2-sections-nav-button>
        ` + this.l2_sections_nav_style();
    }

}
customElements.define('l2-local-nav', l2_local_nav)