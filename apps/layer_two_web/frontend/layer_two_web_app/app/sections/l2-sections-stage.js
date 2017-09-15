import { l2_personal_stage } from "./personal/l2-personal-stage.js"
import { l2_social_stage } from "./social/l2-social-stage.js"
import { l2_local_stage } from "./local/l2-local-stage.js"
import { l2_country_stage } from "./country/l2-country-stage.js"
import { l2_world_stage } from "./world/l2-world-stage.js"
import { l2_space_stage } from "./space/l2-space-stage.js"
import { l2_visit_stage } from "./visit/l2-visit-stage.js"

export class l2_sections_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['section-display'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'section-display' && newValue === 'Personal') {
            this.shadowRoot.querySelector('l2-personal-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-personal-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Social') {
            this.shadowRoot.querySelector('l2-social-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-social-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Local') {
            this.shadowRoot.querySelector('l2-local-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-local-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Country') {
            this.shadowRoot.querySelector('l2-country-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-country-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'World') {
            this.shadowRoot.querySelector('l2-world-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-world-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Space') {
            this.shadowRoot.querySelector('l2-space-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-space-stage').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Visit') {
            this.shadowRoot.querySelector('l2-visit-stage').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-stage').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-visit-stage').style.display = 'none';
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    sections_stage_style() {
        return `<style>
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            background: white;
            padding-left: 1em;
            padding-right: 1em;
        }
        </style>`;
    }

    template() {
        return `
        <l2-personal-stage></l2-personal-stage>
        <l2-social-stage></l2-social-stage>
        <l2-local-stage></l2-local-stage>
        <l2-country-stage></l2-country-stage>
        <l2-world-stage></l2-world-stage>
        <l2-space-stage></l2-space-stage>
        <l2-visit-stage></l2-visit-stage>
        ` + this.sections_stage_style();
    }

}

customElements.define('l2-sections-stage', l2_sections_stage)