import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_world_nav extends HTMLElement {
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
        if (name === 'selected-button' && newValue === 'Assemblies') {
            this.shadowRoot.querySelector("#l2-world-nav-Assemblies").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Assemblies").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-world-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Goals') {
            this.shadowRoot.querySelector("#l2-world-nav-Goals").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Goals").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Problems') {
            this.shadowRoot.querySelector("#l2-world-nav-Problems").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Problems").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Projects') {
            this.shadowRoot.querySelector("#l2-world-nav-Projects").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Projects").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-world-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-world-nav-Status").setAttribute("selected", "false");
        }
    }


    l2_world_nav_style_show(){
        return `
        :host {
            display: grid;
            grid-template-rows: repeat(6, min-content);
            z-index: 500;
            background: white;
            padding-top: 2vh;
            justify-content: center;
        }`;
    }

    template() {
        return `
        <style>${this.l2_world_nav_style_show()}</style>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Assemblies"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Problems"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-world-nav', l2_world_nav)