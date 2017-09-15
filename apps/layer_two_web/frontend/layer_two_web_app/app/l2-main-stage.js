import { l2_sections_nav } from "./sections/l2-sections-nav.js"
import { l2_sections_stage } from "./sections/l2-sections-stage.js"
import { l2_sections_updates } from "./sections/l2-sections-updates.js"


export class l2_main_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['main-stage-display'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'main-stage-display') {
            this.shadowRoot.querySelector("l2-sections-nav").setAttribute("section-display", newValue);
            this.shadowRoot.querySelector("l2-sections-stage").setAttribute("section-display", newValue);
            this.shadowRoot.querySelector("l2-sections-updates").setAttribute("section-display", newValue);
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_stage_style(){
        return `<style>
        :host {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
            background: white;
            margin: 0px;
            padding: 0px;
        }
        </style>`;
    }

    template() {
        return `
        <l2-sections-nav></l2-sections-nav>
        <l2-sections-stage></l2-sections-stage>
        <l2-sections-updates></l2-sections-updates>
        ` + this.l2_main_stage_style();
    }

}
customElements.define('l2-main-stage', l2_main_stage)