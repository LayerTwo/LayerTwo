import {l2_main_nav_button} from "./elements/l2-main-nav-button.js"

export class l2_main_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_nav_default_style(){
        return `
        :host {
           z-index: 700;
           display: grid;
           grid-template-columns: 0.4fr repeat(8, minmax(min-content, auto)) 0.4fr;
           grid-gap: 0.7vw;
           background: white;
       }`;
    }

    template() {
        return `
        <style>${this.l2_main_nav_default_style()}</style>
        <div id="grid spacer"></div>
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