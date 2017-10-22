import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_space_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("show-template", "false");
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

        static get observedAttributes() {
        return ['selected-button'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected-button' && newValue === 'Goals') {
            this.shadowRoot.querySelector("#l2-space-nav-Goals").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-space-nav-Goals").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Missions') {
            this.shadowRoot.querySelector("#l2-space-nav-Missions").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-space-nav-Missions").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Projects') {
            this.shadowRoot.querySelector("#l2-space-nav-Projects").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-space-nav-Projects").setAttribute("selected", "false");
        }
        
        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-space-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-space-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-space-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-space-nav-Status").setAttribute("selected", "false");
        }
    }

    l2_space_nav_style_show(){
        return `
        :host {
            display: grid;
            grid-template-rows: repeat(5, min-content);
            grid-row-gap: 1.5vh;
            z-index: 500;
            background: white;
            padding-top: 4vh;
            padding-left: 1vw;
            padding-right: 1vw;
            justify-content: center;
        }`;
    }

    template() {
        return `
        <style>${this.l2_space_nav_style_show()}</style>
        <l2-sections-nav-button nav-section="l2-space-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-space-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-space-nav" name="Missions"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-space-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-space-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-space-nav', l2_space_nav)