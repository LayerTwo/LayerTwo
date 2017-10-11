import { l2_space_goals_view } from "./goals/l2-space-goals-view.js"
import { l2_space_missions_view } from "./missions/l2-space-missions-view.js"
import { l2_space_projects_view } from "./projects/l2-space-projects-view.js"
import { l2_space_status_view } from "./status/l2-space-status-view.js"
import { l2_space_events_view } from "./events/l2-space-events-view.js"

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
            this.shadowRoot.querySelector('l2-space-goals-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-goals-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-goals-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Missions') {
            this.shadowRoot.querySelector('l2-space-missions-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-missions-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-missions-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-space-projects-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-projects-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-projects-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-space-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-space-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-space-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-space-status-view').setAttribute('show-template', 'false');
        }
    }

    l2_space_stage_style_show(){
        return `
        :host {
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_space_stage_style_show()}</style>
        <l2-space-events-view></l2-space-events-view>
        <l2-space-goals-view></l2-space-goals-view>
        <l2-space-missions-view></l2-space-missions-view>
        <l2-space-projects-view></l2-space-projects-view>
        <l2-space-status-view></l2-space-status-view>
        `;
    }

}
customElements.define('l2-space-stage', l2_space_stage)