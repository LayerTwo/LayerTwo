import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_personal_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
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