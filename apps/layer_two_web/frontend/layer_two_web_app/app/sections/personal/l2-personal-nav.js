import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_personal_nav extends HTMLElement {
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
        if (name === 'selected-button' && newValue === 'Education') {
            this.shadowRoot.querySelector("#l2-personal-nav-Education").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Education").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-personal-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Finances') {
            this.shadowRoot.querySelector("#l2-personal-nav-Finances").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Finances").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Health') {
            this.shadowRoot.querySelector("#l2-personal-nav-Health").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Health").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Jobs') {
            this.shadowRoot.querySelector("#l2-personal-nav-Jobs").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Jobs").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-personal-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-personal-nav-Status").setAttribute("selected", "false");
        }
    }

    l2_personal_nav_style_show(){
        return `
        :host {
            display: grid;
            z-index: 500;
            grid-template-rows: 0.2fr repeat(7, min-content) 0.2fr;
            grid-gap: 1.5vh;
            background: white;
        }`
        ;
    }

    template() {
        return `
        <style>${this. l2_personal_nav_style_show()}</style>
        <div></div>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Finances"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Education"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Health"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-personal-nav" name="Jobs"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-personal-nav', l2_personal_nav)