import { l2_local_authorities_main } from "./authorities/l2-local-authorities-main.js"
import { l2_local_businesses_main } from "./businesses/l2-local-businesses-main.js"
import { l2_local_events_main } from "./events/l2-local-events-main.js"
import { l2_local_goals_main } from "./goals/l2-local-goals-main.js"
import { l2_local_problems_main } from "./problems/l2-local-problems-main.js"
import { l2_local_projects_main } from "./projects/l2-local-projects-main.js"
import { l2_local_status_main } from "./status/l2-local-status-main.js"


export class l2_local_stage extends HTMLElement {
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
            this.shadowRoot.querySelector('l2-local-authorities-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-authorities-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-authorities-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Businesses') {
            this.shadowRoot.querySelector('l2-local-businesses-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-businesses-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-businesses-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-local-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-local-goals-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-goals-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-goals-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-local-problems-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-problems-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-problems-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-local-projects-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-projects-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-projects-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-local-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-status-main').setAttribute('show-template', 'false');
        }
    }


    l2_local_stage_style_show(){
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
        <style>${this.l2_local_stage_style_show()}</style>
        <l2-local-authorities-main></l2-local-authorities-main>
        <l2-local-businesses-main></l2-local-businesses-main>
        <l2-local-events-main></l2-local-events-main>
        <l2-local-goals-main></l2-local-goals-main>
        <l2-local-problems-main></l2-local-problems-main>
        <l2-local-projects-main></l2-local-projects-main>
        <l2-local-status-main></l2-local-status-main>
        `;
    }

}
customElements.define('l2-local-stage', l2_local_stage)