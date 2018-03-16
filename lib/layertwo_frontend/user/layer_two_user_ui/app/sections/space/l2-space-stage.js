import { l2_space_goals_main } from "./goals/l2-space-goals-main.js"
import { l2_space_missions_main } from "./missions/l2-space-missions-main.js"
import { l2_space_projects_main } from "./projects/l2-space-projects-main.js"
import { l2_space_status_main } from "./status/l2-space-status-main.js"
import { l2_space_events_main } from "./events/l2-space-events-main.js"

export class l2_space_stage extends HTMLElement {
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
        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-space-goals-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-goals-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-goals-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Missions') {
            this.shadowRoot.querySelector('l2-space-missions-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-missions-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-missions-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-space-projects-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-projects-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-projects-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-space-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-space-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_space_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }`;
    }

    template() {
        return `
        <style>${this.l2_space_stage_style_show()}</style>
        <l2-space-events-main></l2-space-events-main>
        <l2-space-goals-main></l2-space-goals-main>
        <l2-space-missions-main></l2-space-missions-main>
        <l2-space-projects-main></l2-space-projects-main>
        <l2-space-status-main></l2-space-status-main>
        `;
    }

}
customElements.define('l2-space-stage', l2_space_stage)