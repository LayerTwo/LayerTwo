import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_city_nav extends HTMLElement {
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
            this.shadowRoot.querySelector("#l2-city-nav-Authorities").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Authorities").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Businesses') {
            this.shadowRoot.querySelector("#l2-city-nav-Businesses").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Businesses").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-city-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Goals') {
            this.shadowRoot.querySelector("#l2-city-nav-Goals").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Goals").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Leisure') {
            this.shadowRoot.querySelector("#l2-city-nav-Leisure").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Leisure").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Problems') {
            this.shadowRoot.querySelector("#l2-city-nav-Problems").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Problems").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Projects') {
            this.shadowRoot.querySelector("#l2-city-nav-Projects").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Projects").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-city-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-city-nav-Status").setAttribute("selected", "false");
        }
    }

    l2_city_nav_style_show(){
        return `
        :host {
            display: grid;
            grid-template-rows: repeat(8, min-content);
            z-index: 500;
            background: white;
            padding-top: 2vh;
            justify-content: center;
        }`;
    }

    template() {
        return `
        <style>${this.l2_city_nav_style_show()}</style>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Leisure"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Businesses"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Authorities"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Problems"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-city-nav', l2_city_nav)