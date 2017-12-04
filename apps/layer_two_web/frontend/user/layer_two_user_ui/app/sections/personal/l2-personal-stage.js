import { l2_personal_education_main } from "./education/l2-personal-education-main.js"
import { l2_personal_events_main } from "./events/l2-personal-events-main.js"
import { l2_personal_finances_main } from "./finances/l2-personal-finances-main.js"
import { l2_personal_health_main } from "./health/l2-personal-health-main.js"
import { l2_personal_jobs_main } from "./jobs/l2-personal-jobs-main.js"
import { l2_personal_status_main } from "./status/l2-personal-status-main.js"

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
            this.shadowRoot.querySelector('l2-personal-education-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-education-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-education-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-personal-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Finances') {
            this.shadowRoot.querySelector('l2-personal-finances-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-finances-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-finances-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Health') {
            this.shadowRoot.querySelector('l2-personal-health-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-health-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-health-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Jobs') {
            this.shadowRoot.querySelector('l2-personal-jobs-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-jobs-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-jobs-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-personal-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-personal-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-personal-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_personal_stage_style_show(){
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
        <style>${this.l2_personal_stage_style_show()}</style>
        <l2-personal-education-main></l2-personal-education-main>
        <l2-personal-businesses-main></l2-personal-businesses-main>
        <l2-personal-events-main></l2-personal-events-main>
        <l2-personal-finances-main></l2-personal-finances-main>
        <l2-personal-health-main></l2-personal-health-main>
        <l2-personal-jobs-main></l2-personal-jobs-main>
        <l2-personal-projects-main></l2-personal-projects-main>
        <l2-personal-status-main></l2-personal-status-main>
        `;
    }

}
customElements.define('l2-personal-stage', l2_personal_stage)