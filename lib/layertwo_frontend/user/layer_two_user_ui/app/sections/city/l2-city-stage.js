import { l2_city_authorities_main } from "./authorities/l2-city-authorities-main.js"
import { l2_city_businesses_main } from "./businesses/l2-city-businesses-main.js"
import { l2_city_events_main } from "./events/l2-city-events-main.js"
import { l2_city_goals_main } from "./goals/l2-city-goals-main.js"
import { l2_city_leisure_main } from "./leisure/l2-city-leisure-main.js"
import { l2_city_problems_main } from "./problems/l2-city-problems-main.js"
import { l2_city_projects_main } from "./projects/l2-city-projects-main.js"
import { l2_city_status_main } from "./status/l2-city-status-main.js"

export class l2_city_stage extends HTMLElement {
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
            this.shadowRoot.querySelector('l2-city-authorities-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-authorities-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-authorities-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Businesses') {
            this.shadowRoot.querySelector('l2-city-businesses-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-businesses-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-businesses-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-city-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-city-goals-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-goals-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-goals-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Leisure') {
            this.shadowRoot.querySelector('l2-city-leisure-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-leisure-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-leisure-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-city-problems-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-problems-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-problems-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-city-projects-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-projects-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-projects-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-city-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_city_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }`;
    }

    template() {
        return `
        <style>${this.l2_city_stage_style_show()}</style>
        <l2-city-authorities-main></l2-city-authorities-main>
        <l2-city-businesses-main></l2-city-businesses-main>
        <l2-city-events-main></l2-city-events-main>
        <l2-city-goals-main></l2-city-goals-main>
        <l2-city-leisure-main></l2-city-leisure-main>
        <l2-city-problems-main></l2-city-problems-main>
        <l2-city-projects-main></l2-city-projects-main>
        <l2-city-status-main></l2-city-status-main>
        `;
    }

}
customElements.define('l2-city-stage', l2_city_stage)