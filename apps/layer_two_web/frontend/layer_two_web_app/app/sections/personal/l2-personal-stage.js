import { l2_personal_education_view } from "./education/l2-personal-education-view.js"
import { l2_personal_events_view } from "./events/l2-personal-events-view.js"
import { l2_personal_finances_view } from "./finances/l2-personal-finances-view.js"
import { l2_personal_health_view } from "./health/l2-personal-health-view.js"
import { l2_personal_jobs_view } from "./jobs/l2-personal-jobs-view.js"
import { l2_personal_status_view } from "./status/l2-personal-status-view.js"

export class l2_personal_stage extends HTMLElement {
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
        if (name === 'display-view' && newValue === 'Education') {
            this.shadowRoot.querySelector('l2-personal-education-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-education-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-education-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-personal-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Finances') {
            this.shadowRoot.querySelector('l2-personal-finances-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-finances-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-finances-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Health') {
            this.shadowRoot.querySelector('l2-personal-health-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-health-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-health-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Jobs') {
            this.shadowRoot.querySelector('l2-personal-jobs-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-jobs-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-jobs-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-personal-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-status-view').setAttribute('show-template', 'false');
        }
    }

    l2_personal_stage_style_show(){
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
        <style>${this.l2_personal_stage_style_show()}</style>
        <l2-personal-education-view></l2-personal-education-view>
        <l2-personal-businesses-view></l2-personal-businesses-view>
        <l2-personal-events-view></l2-personal-events-view>
        <l2-personal-finances-view></l2-personal-finances-view>
        <l2-personal-health-view></l2-personal-health-view>
        <l2-personal-jobs-view></l2-personal-jobs-view>
        <l2-personal-projects-view></l2-personal-projects-view>
        <l2-personal-status-view></l2-personal-status-view>
        `;
    }

}
customElements.define('l2-personal-stage', l2_personal_stage)