import { l2_city_nav } from "./city/l2-city-nav.js"
import { l2_city_stage } from "./city/l2-city-stage.js"


export class l2_sections_city_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-city-nav Authorities", this.show_city_view_authorities);
        this.addEventListener("l2-city-nav Businesses", this.show_city_view_businesses);
        this.addEventListener("l2-city-nav Events", this.show_city_view_events);
        this.addEventListener("l2-city-nav Goals", this.show_city_view_goals);
        this.addEventListener("l2-city-nav Leisure", this.show_city_view_leisure);
        this.addEventListener("l2-city-nav Problems", this.show_city_view_problems);
        this.addEventListener("l2-city-nav Projects", this.show_city_view_projects);
        this.addEventListener("l2-city-nav Status", this.show_city_view_status);
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

    
    show_city_view_authorities() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Authorities");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Authorities");
    }

    show_city_view_businesses() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Businesses");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Businesses");
    }

    show_city_view_events() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Events");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Events");
    }

    show_city_view_goals() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Goals");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Goals");
    }

    show_city_view_leisure() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Leisure");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Leisure");
    }

    show_city_view_problems() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Problems");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Problems");
    }

    show_city_view_projects() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Projects");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Projects");
    }

    show_city_view_status() {
        this.shadowRoot.querySelector("l2-city-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-city-nav").setAttribute( "selected-button", "Status");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-city-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_city_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_city_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_city_main_style_show();
    }

    l2_sections_city_main_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_sections_city_main_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: min-content auto;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `<template id="l2-sections-city-stage-template">
        <style>${this.l2_sections_city_main_style_show()}</style>
        <l2-city-nav></l2-city-nav>
        <l2-city-stage></l2-city-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-city-main', l2_sections_city_main)