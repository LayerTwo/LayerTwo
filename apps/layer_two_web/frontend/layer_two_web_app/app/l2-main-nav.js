import {l2_main_nav_button} from "./elements/l2-main-nav-button.js"

export class l2_main_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_nav_style(){
        return `<style>
        :host {
           display: flex;
           flex-direction: row;
           flex-wrap: wrap;
           justify-content: center;
           align-items: center;
           background: white;
           margin: 0px;
           padding-top: 1.5em;
           padding-bottom: 0.5em;
           padding-left: 1em;
           padding-right: 1em;
       }
       </style>`;
    }

    template() {
        return `
        <l2-main-nav-button nav-section="l2-main-nav" name="Personal"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Social"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Local"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Country"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="World"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Space"></l2-main-nav-button>
        <l2-main-nav-button nav-section="l2-main-nav" name="Visit"></l2-main-nav-button>
        ` + this.l2_main_nav_style();
    }

}
customElements.define('l2-main-nav', l2_main_nav)