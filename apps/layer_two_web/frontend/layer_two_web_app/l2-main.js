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
        this.addEventListener("l2-main-nav Country", this.show_main_stage_country);
        this.addEventListener("l2-main-nav World", this.show_main_stage_world);
        this.addEventListener("l2-main-nav Space", this.show_main_stage_space);
        this.addEventListener("l2-main-nav Visit", this.show_main_stage_visit);
    }

    show_main_stage_personal() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Personal");
    }

    show_main_stage_social() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Social");
    }

    show_main_stage_local() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Local");
    }

    show_main_stage_country() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Country");
    }

    show_main_stage_world() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "World");
    }

    show_main_stage_space() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Space");
    }

    show_main_stage_visit() {
        this.shadowRoot.querySelector("l2-main-stage").setAttribute( "main-stage-display", "Visit");
    }


    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_default_style(){
        return `<style>
        :host {
            display: flex;
            flex-direction: column;
            height: 100vh;
            background: white;
        }
        </style>`;
    }

    template() {
        return `
        <l2-main-nav></l2-main-nav>
        <l2-main-stage></l2-main-stage>
        <l2-main-copyright></l2-main-copyright>
        ` + this.l2_main_default_style();
    }

}
customElements.define('l2-main', l2_main)