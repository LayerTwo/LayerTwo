import { l2_personal_updates } from "./personal/l2-personal-updates.js"
import { l2_social_updates } from "./social/l2-social-updates.js"
import { l2_local_updates } from "./local/l2-local-updates.js"
import { l2_country_updates } from "./country/l2-country-updates.js"
import { l2_world_updates } from "./world/l2-world-updates.js"
import { l2_space_updates } from "./space/l2-space-updates.js"
import { l2_visit_updates } from "./visit/l2-visit-updates.js"

export class l2_sections_updates extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['section-display'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'section-display' && newValue === 'Personal') {
            this.shadowRoot.querySelector('l2-personal-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-personal-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Social') {
            this.shadowRoot.querySelector('l2-social-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-social-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Local') {
            this.shadowRoot.querySelector('l2-local-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-local-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Country') {
            this.shadowRoot.querySelector('l2-country-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-country-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'World') {
            this.shadowRoot.querySelector('l2-world-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-world-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Space') {
            this.shadowRoot.querySelector('l2-space-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-space-updates').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Visit') {
            this.shadowRoot.querySelector('l2-visit-updates').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-updates').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-visit-updates').style.display = 'none';
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    sections_updates_style() {
        return `<style>
        :host {
            display: flex;
            flex-direction: column;
            background: white;
            padding-left: 1em;
            padding-right: 1em;
        }
        </style>`;
    }

    template() {
        return `
        <l2-personal-updates></l2-personal-updates>
        <l2-social-updates></l2-social-updates>
        <l2-local-updates></l2-local-updates>
        <l2-country-updates></l2-country-updates>
        <l2-world-updates></l2-world-updates>
        <l2-space-updates></l2-space-updates>
        <l2-visit-updates></l2-visit-updates>
        ` + this.sections_updates_style();
    }

}

customElements.define('l2-sections-updates', l2_sections_updates)