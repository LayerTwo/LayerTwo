import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_visit_nav extends HTMLElement {
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
        if (name === 'selected-button' && newValue === 'Eco') {
            this.shadowRoot.querySelector("#l2-visit-nav-Eco").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-visit-nav-Eco").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Historic') {
            this.shadowRoot.querySelector("#l2-visit-nav-Historic").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-visit-nav-Historic").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Islands') {
            this.shadowRoot.querySelector("#l2-visit-nav-Islands").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-visit-nav-Islands").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Mountains') {
            this.shadowRoot.querySelector("#l2-visit-nav-Mountains").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-visit-nav-Mountains").setAttribute("selected", "false");
        }
    }

    l2_visit_nav_style_show(){
        return `
        :host {
            display: grid;
            grid-template-rows: repeat(4, min-content);
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
        <style>${this.l2_visit_nav_style_show()}</style>
        <l2-sections-nav-button nav-section="l2-visit-nav" name="Islands"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-visit-nav" name="Mountains"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-visit-nav" name="Historic"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-visit-nav" name="Eco"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-visit-nav', l2_visit_nav)