import { l2_country_nav } from "./country/l2-country-nav.js"
import { l2_country_stage } from "./country/l2-country-stage.js"

export class l2_sections_country_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-country-nav Authorities", this.show_country_view_authorities);
        this.addEventListener("l2-country-nav Economy", this.show_country_view_economy);
        this.addEventListener("l2-country-nav Events", this.show_country_view_events);
        this.addEventListener("l2-country-nav Goals", this.show_country_view_goals);
        this.addEventListener("l2-country-nav Problems", this.show_country_view_problems);
        this.addEventListener("l2-country-nav Projects", this.show_country_view_projects);
        this.addEventListener("l2-country-nav Status", this.show_country_view_status);
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


    show_country_view_authorities() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Authorities");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Authorities");
    }

    show_country_view_economy() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Economy");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Economy");
    }

    show_country_view_events() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Events");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Events");
    }

    show_country_view_goals() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Goals");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Goals");
    }

    show_country_view_problems() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Problems");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Problems");
    }

    show_country_view_projects() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Projects");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Projects");
    }

    show_country_view_status() {
        this.shadowRoot.querySelector("l2-country-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-country-nav").setAttribute( "selected-button", "Status");
    }


    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-country-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_country_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_country_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_country_main_style_show();
    }

    l2_sections_country_main_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_sections_country_main_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: min-content auto;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `<template id="l2-sections-country-stage-template">
        <l2-country-nav></l2-country-nav>
        <l2-country-stage></l2-country-stage>
        <style>${this.l2_sections_country_main_style_show()}</style>
        </template>
        `;
    }

}

customElements.define('l2-sections-country-main', l2_sections_country_main)