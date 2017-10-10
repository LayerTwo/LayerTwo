import {l2_main_nav} from "./app/l2-main-nav.js"
import {l2_main_stage} from "./app/l2-main-stage.js"
import {l2_main_copyright} from "./app/l2-main-copyright.js"

export class l2_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener("l2-main-nav Personal", this.show_main_stage_personal);
        this.addEventListener("l2-main-nav Social", this.show_main_stage_social);
        this.addEventListener("l2-main-nav Local", this.show_main_stage_local);
        this.addEventListener("l2-main-nav City", this.show_main_stage_city);
        this.addEventListener("l2-main-nav Country", this.show_main_stage_country);
        this.addEventListener("l2-main-nav World", this.show_main_stage_world);
        this.addEventListener("l2-main-nav Space", this.show_main_stage_space);
        this.addEventListener("l2-main-nav Visit", this.show_main_stage_visit);
    }

    show_main_stage_personal() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Personal");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Personal");
    }

    show_main_stage_social() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Social");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Social");
    }

    show_main_stage_local() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Local");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Local");
    }

    show_main_stage_city() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "City");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "City");
    }

    show_main_stage_country() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Country");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Country");
    }

    show_main_stage_world() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "World");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "World");
    }

    show_main_stage_space() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Space");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Space");
    }

    show_main_stage_visit() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-section-display", "Visit");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute( "selected-button", "Visit");
    }


    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_default_style(){
        return `
        :host {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: minmax(auto, max-content) auto minmax(auto, max-content);
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_main_default_style()}</style>
        <l2-main-nav></l2-main-nav>
        <l2-main-stage></l2-main-stage>
        <l2-main-copyright></l2-main-copyright>
        `;
    }

}
customElements.define('l2-main', l2_main)