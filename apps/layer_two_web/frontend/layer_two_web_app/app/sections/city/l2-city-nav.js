import {l2_sections_nav_button} from "../../elements/l2-sections-nav-button.js"

export class l2_city_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_city_nav_style_show(){
        return `
        :host {
            display: grid;
            z-index: 500;
            grid-template-rows: 0.2fr repeat(9, min-content) 0.2fr;
            grid-gap: 1.5vh;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_city_nav_style_show()}</style>
        <div></div>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Status"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Events"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Leisure"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Businesses"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Projects"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Authorities"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Problems"></l2-sections-nav-button>
        <l2-sections-nav-button nav-section="l2-city-nav" name="Goals"></l2-sections-nav-button>
        `;
    }

}
customElements.define('l2-city-nav', l2_city_nav)