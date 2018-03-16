import { l2_visit_eco_main } from "./eco/l2-visit-eco-main.js"
import { l2_visit_historic_main } from "./historic/l2-visit-historic-main.js"
import { l2_visit_islands_main } from "./islands/l2-visit-islands-main.js"
import { l2_visit_mountains_main } from "./mountains/l2-visit-mountains-main.js"

export class l2_visit_stage extends HTMLElement {
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
        if (name === 'display-view' && newValue === 'Eco') {
            this.shadowRoot.querySelector('l2-visit-eco-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-eco-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-eco-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Historic') {
            this.shadowRoot.querySelector('l2-visit-historic-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-historic-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-historic-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Islands') {
            this.shadowRoot.querySelector('l2-visit-islands-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-islands-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-islands-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Mountains') {
            this.shadowRoot.querySelector('l2-visit-mountains-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-mountains-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-mountains-main').setAttribute('show-template', 'false');
        }
    }

    l2_visit_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }`;
    }

    template() {
        return `
        <style>${this.l2_visit_stage_style_show()}</style>
        <l2-visit-eco-main></l2-visit-eco-main>
        <l2-visit-historic-main></l2-visit-historic-main>
        <l2-visit-islands-main></l2-visit-islands-main>
        <l2-visit-mountains-main></l2-visit-mountains-main>
        `;
    }

}
customElements.define('l2-visit-stage', l2_visit_stage)