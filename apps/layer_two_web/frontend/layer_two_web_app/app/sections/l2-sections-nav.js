import { l2_personal_nav } from "./personal/l2-personal-nav.js"
import { l2_social_nav } from "./social/l2-social-nav.js"
import { l2_local_nav } from "./local/l2-local-nav.js"
import { l2_country_nav } from "./country/l2-country-nav.js"
import { l2_world_nav } from "./world/l2-world-nav.js"
import { l2_space_nav } from "./space/l2-space-nav.js"
import { l2_visit_nav } from "./visit/l2-visit-nav.js"

export class l2_sections_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['section-display'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'section-display' && newValue === 'Personal') {
            this.shadowRoot.querySelector('l2-personal-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-personal-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Social') {
            this.shadowRoot.querySelector('l2-social-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-social-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Local') {
            this.shadowRoot.querySelector('l2-local-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-local-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Country') {
            this.shadowRoot.querySelector('l2-country-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-country-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'World') {
            this.shadowRoot.querySelector('l2-world-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-world-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Space') {
            this.shadowRoot.querySelector('l2-space-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-space-nav').style.display = 'none';
        }

        if (name === 'section-display' && newValue === 'Visit') {
            this.shadowRoot.querySelector('l2-visit-nav').style.display = 'flex';
        } else {
            this.shadowRoot.querySelector('l2-visit-nav').style.display = 'none';
        }
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    sections_nav_style() {
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
        <l2-personal-nav style="display: none"></l2-personal-nav>
        <l2-social-nav style="display: none"></l2-social-nav>
        <l2-local-nav style="display: none"></l2-local-nav>
        <l2-country-nav style="display: none"></l2-country-nav>
        <l2-world-nav style="display: none"></l2-world-nav>
        <l2-space-nav style="display: none"></l2-space-nav>
        <l2-visit-nav style="display: none"></l2-visit-nav>
        ` + this.sections_nav_style();
    }

}

customElements.define('l2-sections-nav', l2_sections_nav)