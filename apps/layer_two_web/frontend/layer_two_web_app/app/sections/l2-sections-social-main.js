import { l2_social_nav } from "./social/l2-social-nav.js"
import { l2_social_stage } from "./social/l2-social-stage.js"


export class l2_sections_social_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-social-nav Channels", this.show_social_view_channels);
        this.addEventListener("l2-social-nav Events", this.show_social_view_events);
        this.addEventListener("l2-social-nav Friends", this.show_social_view_friends);
        this.addEventListener("l2-social-nav Interests", this.show_social_view_interests);
        this.addEventListener("l2-social-nav Views", this.show_social_view_views);
        this.addEventListener("l2-social-nav Status", this.show_social_view_status);
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'render-template' && oldValue === 'false' && newValue === 'true'){
            this.render_template();
            window.dispatchEvent(new Event('resize'));
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
            window.dispatchEvent(new Event('resize'));
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    
    show_social_view_channels() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Channels");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Channels");
    }

    show_social_view_events() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Events");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Events");
    }

    show_social_view_friends() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Friends");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Friends");
    }

    show_social_view_interests() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Interests");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Interests");
    }

    show_social_view_views() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Views");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Views");
    }

    show_social_view_status() {
        this.shadowRoot.querySelector("l2-social-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-social-nav").setAttribute( "selected-button", "Status");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-social-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_social_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_social_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_social_main_style_show();
    }

    l2_sections_social_main_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_sections_social_main_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: min-content auto;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `<template id="l2-sections-social-stage-template">
        <style>${this.l2_sections_social_main_style_show()}</style>
        <l2-social-nav></l2-social-nav>
        <l2-social-stage></l2-social-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-social-main', l2_sections_social_main)