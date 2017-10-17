import { l2_local_authorities_view } from "./authorities/l2-local-authorities-view.js"
import { l2_local_businesses_view } from "./businesses/l2-local-businesses-view.js"
import { l2_local_events_view } from "./events/l2-local-events-view.js"
import { l2_local_goals_view } from "./goals/l2-local-goals-view.js"
import { l2_local_problems_view } from "./problems/l2-local-problems-view.js"
import { l2_local_projects_view } from "./projects/l2-local-projects-view.js"
import { l2_local_status_view } from "./status/l2-local-status-view.js"


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
            this.shadowRoot.querySelector('l2-local-authorities-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-authorities-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-authorities-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Businesses') {
            this.shadowRoot.querySelector('l2-local-businesses-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-businesses-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-businesses-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-local-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Goals') {
            this.shadowRoot.querySelector('l2-local-goals-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-goals-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-goals-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Problems') {
            this.shadowRoot.querySelector('l2-local-problems-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-problems-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-problems-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Projects') {
            this.shadowRoot.querySelector('l2-local-projects-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-projects-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-projects-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-local-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-local-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-local-status-view').setAttribute('show-template', 'false');
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
        }`
        ;
    }

    template() {
        return `
        <style>${this.l2_local_stage_style_show()}</style>
        <l2-local-authorities-view></l2-local-authorities-view>
        <l2-local-businesses-view></l2-local-businesses-view>
        <l2-local-events-view></l2-local-events-view>
        <l2-local-goals-view></l2-local-goals-view>
        <l2-local-problems-view></l2-local-problems-view>
        <l2-local-projects-view></l2-local-projects-view>
        <l2-local-status-view></l2-local-status-view>
        `;
    }

}
customElements.define('l2-local-stage', l2_local_stage)