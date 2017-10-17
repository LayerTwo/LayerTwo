import {l2_main_nav_button} from "./elements/l2-main-nav-button.js"

export class l2_main_nav extends HTMLElement {
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
        if (name === 'selected-button' && newValue === 'City') {
            this.shadowRoot.querySelector("#l2-main-nav-City").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-City").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Country') {
            this.shadowRoot.querySelector("#l2-main-nav-Country").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Country").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Local') {
            this.shadowRoot.querySelector("#l2-main-nav-Local").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Local").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Personal') {
            this.shadowRoot.querySelector("#l2-main-nav-Personal").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Personal").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Social') {
            this.shadowRoot.querySelector("#l2-main-nav-Social").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Social").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Space') {
            this.shadowRoot.querySelector("#l2-main-nav-Space").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Space").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Visit') {
            this.shadowRoot.querySelector("#l2-main-nav-Visit").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-Visit").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'World') {
            this.shadowRoot.querySelector("#l2-main-nav-World").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-main-nav-World").setAttribute("selected", "false");
        }
    }

    l2_main_nav_default_style(){
        return `
        :host {
           z-index: 700;
           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           background: white;
           padding-top: 1.5vh;
           padding-bottom: 1.5vh;
       }`;
    }

    template() {
        return `
        <style>${this.l2_main_nav_default_style()}</style>
        <l2-main-nav-button nav-section="l2-main-nav" name="Personal"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Social"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Local"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="City"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Country"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="World"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Space"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Visit"></l2-main-nav-button>
        `;
    }

}
customElements.define('l2-main-nav', l2_main_nav)