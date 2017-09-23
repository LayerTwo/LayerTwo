import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_social_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("show-template", "false");
    }

    static get observedAttributes() {
        return ['show-template'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_social_nav_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_social_nav_style_show();
    }

    l2_social_nav_style_hide(){
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    l2_social_nav_style_show(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            background: white;
        }`
        ;
    }

    template() {
        return `
        <l2-sections-nav-button nav-section="l2-social-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Friends"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Channels"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Interests"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-social-nav" name="Views"></l2-sections-nav-button>
        <style>${this.l2_social_nav_style_hide()}</style>`;
    }

}
customElements.define('l2-social-nav', l2_social_nav)