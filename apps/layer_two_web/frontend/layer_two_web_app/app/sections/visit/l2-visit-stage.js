import { l2_visit_eco_view } from "./eco/l2-visit-eco-view.js"
import { l2_visit_historic_view } from "./historic/l2-visit-historic-view.js"
import { l2_visit_islands_view } from "./islands/l2-visit-islands-view.js"
import { l2_visit_mountains_view } from "./mountains/l2-visit-mountains-view.js"

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
            this.shadowRoot.querySelector('l2-visit-eco-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-eco-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-eco-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Historic') {
            this.shadowRoot.querySelector('l2-visit-historic-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-historic-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-historic-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Islands') {
            this.shadowRoot.querySelector('l2-visit-islands-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-islands-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-islands-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Mountains') {
            this.shadowRoot.querySelector('l2-visit-mountains-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-visit-mountains-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-visit-mountains-view').setAttribute('show-template', 'false');
        }
    }

    l2_visit_stage_style_show(){
        return `
        :host {
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_visit_stage_style_show()}</style>
        <l2-visit-eco-view></l2-visit-eco-view>
        <l2-visit-historic-view></l2-visit-historic-view>
        <l2-visit-islands-view></l2-visit-islands-view>
        <l2-visit-mountains-view></l2-visit-mountains-view>
        `;
    }

}
customElements.define('l2-visit-stage', l2_visit_stage)