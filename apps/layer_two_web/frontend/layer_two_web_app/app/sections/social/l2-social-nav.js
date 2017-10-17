import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_social_nav extends HTMLElement {
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
        if (name === 'selected-button' && newValue === 'Channels') {
            this.shadowRoot.querySelector("#l2-social-nav-Channels").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Channels").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Events') {
            this.shadowRoot.querySelector("#l2-social-nav-Events").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Events").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Friends') {
            this.shadowRoot.querySelector("#l2-social-nav-Friends").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Friends").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Interests') {
            this.shadowRoot.querySelector("#l2-social-nav-Interests").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Interests").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Status') {
            this.shadowRoot.querySelector("#l2-social-nav-Status").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Status").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Views') {
            this.shadowRoot.querySelector("#l2-social-nav-Views").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-social-nav-Views").setAttribute("selected", "false");
        }
    }

    l2_social_nav_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            z-index: 500;
            background: white;
            padding-left: 1vw;
            padding-right: 1vw;
            justify-content: center;
        }`;
    }

    template() {
        return `
        <style>${this.l2_social_nav_style_show()}</style>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Friends"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Channels"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Interests"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Views"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-social-nav', l2_social_nav)