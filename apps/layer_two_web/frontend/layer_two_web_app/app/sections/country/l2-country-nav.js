import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_country_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    static get observedAttributes() {
        return ['selected-button'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected-button' && newValue === 'Authorities') {
            this.shadowRoot.querySelector("#l2-country-nav-Authorities").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Authorities").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Economy') {
            this.shadowRoot.querySelector("#l2-country-nav-Economy").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Economy").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-country-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Goals') {
            this.shadowRoot.querySelector("#l2-country-nav-Goals").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Goals").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Problems') {
            this.shadowRoot.querySelector("#l2-country-nav-Problems").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Problems").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Projects') {
            this.shadowRoot.querySelector("#l2-country-nav-Projects").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Projects").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-country-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-country-nav-Status").setAttribute("selected", "false");
        }
    }

    l2_country_nav_style_show(){
        return `
        :host {
            display: grid;
            z-index: 500;
            grid-template-rows: 0.2fr repeat(8, min-content) 0.2fr;
            grid-gap: 1.5vh;
            background: white;
        }`
        ;
    }

    template() {
        return `
        <style>${this.l2_country_nav_style_show()}</style>
        <div></div>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Economy"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Authorities"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Problems"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-country-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-country-nav', l2_country_nav)