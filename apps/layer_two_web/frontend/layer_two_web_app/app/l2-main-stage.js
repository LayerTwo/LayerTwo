import { l2_sections_city_main } from "./sections/l2-sections-city-main.js"
import { l2_sections_country_main } from "./sections/l2-sections-country-main.js"
import { l2_sections_local_main } from "./sections/l2-sections-local-main.js"
import { l2_sections_personal_main } from "./sections/l2-sections-personal-main.js"
import { l2_sections_social_main } from "./sections/l2-sections-social-main.js"
import { l2_sections_space_main } from "./sections/l2-sections-space-main.js"
import { l2_sections_visit_main } from "./sections/l2-sections-visit-main.js"
import { l2_sections_world_main } from "./sections/l2-sections-world-main.js"

export class l2_main_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['main-section-display'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'main-section-display' && newValue === 'City') {
            this.shadowRoot.querySelector("l2-sections-city-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-city-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-city-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Country') {
            this.shadowRoot.querySelector("l2-sections-country-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-country-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-country-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Local') {
            this.shadowRoot.querySelector("l2-sections-local-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-local-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-local-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Personal') {
            this.shadowRoot.querySelector("l2-sections-personal-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-personal-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-personal-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Social') {
            this.shadowRoot.querySelector("l2-sections-social-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-social-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-social-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Space') {
            this.shadowRoot.querySelector("l2-sections-space-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-space-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-space-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'Visit') {
            this.shadowRoot.querySelector("l2-sections-visit-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-visit-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-visit-main").setAttribute("show-template", "false");
        }

        if (name === 'main-section-display' && newValue === 'World') {
            this.shadowRoot.querySelector("l2-sections-world-main").setAttribute("render-template", "true");
            this.shadowRoot.querySelector("l2-sections-world-main").setAttribute("show-template", "true");
        } else {
            this.shadowRoot.querySelector("l2-sections-world-main").setAttribute("show-template", "false");
        }
    }

    l2_main_stage_default_style(){
        return `
        :host {
            background: white;
            margin: 0px;
            padding: 0px;
        }`;
    }

    template() {
        return `
        <style>${this.l2_main_stage_default_style()}</style>
        <l2-sections-city-main></l2-sections-city-main>
        <l2-sections-country-main></l2-sections-country-main>
        <l2-sections-local-main></l2-sections-local-main>
        <l2-sections-personal-main></l2-sections-personal-main>
        <l2-sections-social-main></l2-sections-social-main>
        <l2-sections-space-main></l2-sections-space-main>
        <l2-sections-visit-main></l2-sections-visit-main>
        <l2-sections-world-main></l2-sections-world-main>
        `;
    }

}
customElements.define('l2-main-stage', l2_main_stage)