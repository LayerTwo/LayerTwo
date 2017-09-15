import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_world_nav extends HTMLElement {
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
        <l2-sections-nav-button nav-section="l2-world-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Goals"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-world-nav" name="Assemblies"></l2-sections-nav-button>
        ` + this.l2_sections_nav_style();
    }

}
customElements.define('l2-world-nav', l2_world_nav)