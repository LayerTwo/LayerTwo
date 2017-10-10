import { l2_world_assemblies_view } from "./assemblies/l2-world-assemblies-view.js"
import { l2_world_events_view } from "./events/l2-world-events-view.js"
import { l2_world_goals_view } from "./goals/l2-world-goals-view.js"
import { l2_world_problems_view } from "./problems/l2-world-problems-view.js"
import { l2_world_projects_view } from "./projects/l2-world-projects-view.js"
import { l2_world_status_view } from "./status/l2-world-status-view.js"

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
            this.shadowRoot.querySelector('l2-world-assemblies-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-assemblies-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-assemblies-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-world-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-world-goals-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-goals-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-goals-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-world-problems-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-problems-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-problems-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-world-projects-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-projects-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-projects-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-world-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-world-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-world-status-view').setAttribute('show-template', 'false');
        }
    }

    l2_world_stage_style_show(){
        return `
        :host {
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_world_stage_style_show()}</style>
        <l2-world-assemblies-view></l2-world-assemblies-view>
        <l2-world-events-view></l2-world-events-view>
        <l2-world-goals-view></l2-world-goals-view>
        <l2-world-problems-view></l2-world-problems-view>
        <l2-world-projects-view></l2-world-projects-view>
        <l2-world-status-view></l2-world-status-view>
        `;
    }

}
customElements.define('l2-world-stage', l2_world_stage)