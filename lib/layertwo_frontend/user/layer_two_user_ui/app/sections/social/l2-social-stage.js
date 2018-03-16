import { l2_social_channels_main } from "./channels/l2-social-channels-main.js"
import { l2_social_events_main } from "./events/l2-social-events-main.js"
import { l2_social_friends_main } from "./friends/l2-social-friends-main.js"
import { l2_social_interests_main } from "./interests/l2-social-interests-main.js"
import { l2_social_views_main } from "./views/l2-social-views-main.js"
import { l2_social_status_main } from "./status/l2-social-status-main.js"

export class l2_social_stage extends HTMLElement {
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
        if (name === 'display-view' && newValue === 'Channels') {
            this.shadowRoot.querySelector('l2-social-channels-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-channels-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-channels-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-social-events-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-events-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-events-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Friends') {
            this.shadowRoot.querySelector('l2-social-friends-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-friends-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-friends-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Interests') {
            this.shadowRoot.querySelector('l2-social-interests-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-interests-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-interests-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Views') {
            this.shadowRoot.querySelector('l2-social-views-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-views-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-views-main').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-social-status-main').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-status-main').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-status-main').setAttribute('show-template', 'false');
        }
    }

    l2_social_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }`;
    }

    template() {
        return `
        <style>${this.l2_social_stage_style_show()}</style>
        <l2-social-channels-main></l2-social-channels-main>
        <l2-social-businesses-main></l2-social-businesses-main>
        <l2-social-events-main></l2-social-events-main>
        <l2-social-friends-main></l2-social-friends-main>
        <l2-social-interests-main></l2-social-interests-main>
        <l2-social-views-main></l2-social-views-main>
        <l2-social-projects-main></l2-social-projects-main>
        <l2-social-status-main></l2-social-status-main>
        `;
    }

}
customElements.define('l2-social-stage', l2_social_stage)