import { l2_social_channels_view } from "./channels/l2-social-channels-view.js"
import { l2_social_events_view } from "./events/l2-social-events-view.js"
import { l2_social_friends_view } from "./friends/l2-social-friends-view.js"
import { l2_social_interests_view } from "./interests/l2-social-interests-view.js"
import { l2_social_views_view } from "./views/l2-social-views-view.js"
import { l2_social_status_view } from "./status/l2-social-status-view.js"

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
            this.shadowRoot.querySelector('l2-social-channels-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-channels-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-channels-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Events') {
            this.shadowRoot.querySelector('l2-social-events-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-events-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-events-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Friends') {
            this.shadowRoot.querySelector('l2-social-friends-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-friends-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-friends-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Interests') {
            this.shadowRoot.querySelector('l2-social-interests-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-interests-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-interests-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Views') {
            this.shadowRoot.querySelector('l2-social-views-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-views-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-views-view').setAttribute('show-template', 'false');
        }

        if (name === 'display-view' && newValue === 'Status') {
            this.shadowRoot.querySelector('l2-social-status-view').setAttribute('render-template', 'true');
            this.shadowRoot.querySelector('l2-social-status-view').setAttribute('show-template', 'true');
        } else {
            this.shadowRoot.querySelector('l2-social-status-view').setAttribute('show-template', 'false');
        }
    }

    l2_social_stage_style_show(){
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
        <style>${this.l2_social_stage_style_show()}</style>
        <l2-social-channels-view></l2-social-channels-view>
        <l2-social-businesses-view></l2-social-businesses-view>
        <l2-social-events-view></l2-social-events-view>
        <l2-social-friends-view></l2-social-friends-view>
        <l2-social-interests-view></l2-social-interests-view>
        <l2-social-views-view></l2-social-views-view>
        <l2-social-projects-view></l2-social-projects-view>
        <l2-social-status-view></l2-social-status-view>
        `;
    }

}
customElements.define('l2-social-stage', l2_social_stage)