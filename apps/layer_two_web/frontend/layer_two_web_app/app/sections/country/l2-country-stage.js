import { l2_country_authorities_main } from "./authorities/l2-country-authorities-main.js"
import { l2_country_economy_main } from "./economy/l2-country-economy-main.js"
import { l2_country_events_main } from "./events/l2-country-events-main.js"
import { l2_country_goals_main } from "./goals/l2-country-goals-main.js"
import { l2_country_problems_main } from "./problems/l2-country-problems-main.js"
import { l2_country_projects_main } from "./projects/l2-country-projects-main.js"
import { l2_country_status_main } from "./status/l2-country-status-main.js"

export class l2_country_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['display-view'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'display-view' && newValue === 'Authorities') {
            this.shadowRoot.querySelector('l2-country-authorities-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-authorities-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-authorities-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Economy') {
            this.shadowRoot.querySelector('l2-country-economy-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-economy-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-economy-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-country-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-country-goals-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-goals-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-goals-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-country-problems-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-problems-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-problems-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-country-projects-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-projects-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-projects-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-country-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_country_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_country_stage_style_show()}</style>
        <l2-country-authorities-main></l2-country-authorities-main>
        <l2-country-economy-main></l2-country-economy-main>
        <l2-country-events-main></l2-country-events-main>
        <l2-country-goals-main></l2-country-goals-main>
        <l2-country-problems-main></l2-country-problems-main>
        <l2-country-projects-main></l2-country-projects-main>
        <l2-country-status-main></l2-country-status-main>
        `;
    }

}
customElements.define('l2-country-stage', l2_country_stage)