import { l2_country_authorities_view } from "./authorities/l2-country-authorities-view.js"
import { l2_country_economy_view } from "./economy/l2-country-economy-view.js"
import { l2_country_events_view } from "./events/l2-country-events-view.js"
import { l2_country_goals_view } from "./goals/l2-country-goals-view.js"
import { l2_country_problems_view } from "./problems/l2-country-problems-view.js"
import { l2_country_projects_view } from "./projects/l2-country-projects-view.js"
import { l2_country_status_view } from "./status/l2-country-status-view.js"

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
            this.shadowRoot.querySelector('l2-country-authorities-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-authorities-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-authorities-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Economy') {
            this.shadowRoot.querySelector('l2-country-economy-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-economy-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-economy-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-country-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-country-goals-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-goals-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-goals-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-country-problems-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-problems-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-problems-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-country-projects-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-projects-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-projects-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-country-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-country-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-country-status-view').setAttribute('show-template', 'false');
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
        <l2-country-authorities-view></l2-country-authorities-view>
        <l2-country-economy-view></l2-country-economy-view>
        <l2-country-events-view></l2-country-events-view>
        <l2-country-goals-view></l2-country-goals-view>
        <l2-country-problems-view></l2-country-problems-view>
        <l2-country-projects-view></l2-country-projects-view>
        <l2-country-status-view></l2-country-status-view>
        `;
    }

}
customElements.define('l2-country-stage', l2_country_stage)