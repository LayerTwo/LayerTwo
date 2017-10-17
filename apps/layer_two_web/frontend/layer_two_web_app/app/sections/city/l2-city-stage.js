import { l2_city_authorities_view } from "./authorities/l2-city-authorities-view.js"
import { l2_city_businesses_view } from "./businesses/l2-city-businesses-view.js"
import { l2_city_events_view } from "./events/l2-city-events-view.js"
import { l2_city_goals_view } from "./goals/l2-city-goals-view.js"
import { l2_city_leisure_view } from "./leisure/l2-city-leisure-view.js"
import { l2_city_problems_view } from "./problems/l2-city-problems-view.js"
import { l2_city_projects_view } from "./projects/l2-city-projects-view.js"
import { l2_city_status_view } from "./status/l2-city-status-view.js"

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
            this.shadowRoot.querySelector('l2-city-authorities-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-authorities-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-authorities-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Businesses') {
            this.shadowRoot.querySelector('l2-city-businesses-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-businesses-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-businesses-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-city-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-city-goals-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-goals-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-goals-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Leisure') {
            this.shadowRoot.querySelector('l2-city-leisure-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-leisure-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-leisure-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-city-problems-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-problems-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-problems-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-city-projects-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-projects-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-projects-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-city-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-city-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-city-status-view').setAttribute('show-template', 'false');
        }
    }

    l2_city_stage_style_show(){
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
        <style>${this.l2_city_stage_style_show()}</style>
        <l2-city-authorities-view></l2-city-authorities-view>
        <l2-city-businesses-view></l2-city-businesses-view>
        <l2-city-events-view></l2-city-events-view>
        <l2-city-goals-view></l2-city-goals-view>
        <l2-city-leisure-view></l2-city-leisure-view>
        <l2-city-problems-view></l2-city-problems-view>
        <l2-city-projects-view></l2-city-projects-view>
        <l2-city-status-view></l2-city-status-view>
        `;
    }

}
customElements.define('l2-city-stage', l2_city_stage)