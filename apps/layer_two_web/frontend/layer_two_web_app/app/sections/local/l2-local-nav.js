import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_local_nav extends HTMLElement {
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
            this.shadowRoot.querySelector("#l2-local-nav-Authorities").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Authorities").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Businesses') {
            this.shadowRoot.querySelector("#l2-local-nav-Businesses").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Businesses").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-local-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Goals') {
            this.shadowRoot.querySelector("#l2-local-nav-Goals").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Goals").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Problems') {
            this.shadowRoot.querySelector("#l2-local-nav-Problems").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Problems").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Projects') {
            this.shadowRoot.querySelector("#l2-local-nav-Projects").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Projects").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-local-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-nav-Status").setAttribute("selected", "false");
        }
    }

    l2_local_nav_style_show(){
        return `
        :host {
            display: grid;
            z-index: 500;
            grid-template-rows: 0.2fr repeat(7, min-content) 0.2fr;
            grid-gap: 1.5vh;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_local_nav_style_show()}</style>
        <div></div>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Businesses"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Authorities"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Problems"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-local-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-local-nav', l2_local_nav)