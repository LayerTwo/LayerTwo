import { l2_world_assemblies_main } from "./assemblies/l2-world-assemblies-main.js"
import { l2_world_events_main } from "./events/l2-world-events-main.js"
import { l2_world_goals_main } from "./goals/l2-world-goals-main.js"
import { l2_world_problems_main } from "./problems/l2-world-problems-main.js"
import { l2_world_projects_main } from "./projects/l2-world-projects-main.js"
import { l2_world_status_main } from "./status/l2-world-status-main.js"

export class l2_world_stage extends HTMLElement {
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
        if (name === 'display-view' && newValue === 'Assemblies') {
            this.shadowRoot.querySelector('l2-world-assemblies-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-assemblies-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-assemblies-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-world-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-world-goals-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-goals-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-goals-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-world-problems-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-problems-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-problems-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-world-projects-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-projects-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-projects-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-world-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_world_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_world_stage_style_show()}</style>
        <l2-world-assemblies-main></l2-world-assemblies-main>
        <l2-world-events-main></l2-world-events-main>
        <l2-world-goals-main></l2-world-goals-main>
        <l2-world-problems-main></l2-world-problems-main>
        <l2-world-projects-main></l2-world-projects-main>
        <l2-world-status-main></l2-world-status-main>
        `;
    }

}
customElements.define('l2-world-stage', l2_world_stage)