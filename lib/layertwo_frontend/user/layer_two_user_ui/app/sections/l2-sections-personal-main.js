import { l2_personal_nav } from "./personal/l2-personal-nav.js"
import { l2_personal_stage } from "./personal/l2-personal-stage.js"


export class l2_sections_personal_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-personal-nav Education", this.show_personal_view_education);
        this.addEventListener("l2-personal-nav Events", this.show_personal_view_events);
        this.addEventListener("l2-personal-nav Finances", this.show_personal_view_finances);
        this.addEventListener("l2-personal-nav Health", this.show_personal_view_health);
        this.addEventListener("l2-personal-nav Jobs", this.show_personal_view_jobs);
        this.addEventListener("l2-personal-nav Status", this.show_personal_view_status);
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
            this.l2_personal_nav_state();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    l2_personal_nav_state(){
        switch (sessionStorage.getItem("l2-personal-nav")) {
            case "education":
                this.show_personal_view_education();
                break;

            case "events":
                this.show_personal_view_events();
                break;

            case "finances":
                this.show_personal_view_finances();
                break;

            case "health":
                this.show_personal_view_health();
                break;

            case "jobs":
                this.show_personal_view_jobs();
                break;

            case "status":
                this.show_personal_view_status();
                break;
            default:
                this.show_personal_view_status();
        }
    }
    
    show_personal_view_education() {
        sessionStorage.setItem("l2-personal-nav", "education");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Education");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Education");
    }

    show_personal_view_events() {
        sessionStorage.setItem("l2-personal-nav", "events");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Events");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Events");
    }

    show_personal_view_finances() {
        sessionStorage.setItem("l2-personal-nav", "finances");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Finances");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Finances");
    }

    show_personal_view_health() {
        sessionStorage.setItem("l2-personal-nav", "health");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Health");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Health");
    }

    show_personal_view_jobs() {
        sessionStorage.setItem("l2-personal-nav", "jobs");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Jobs");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Jobs");
    }

    show_personal_view_status() {
        sessionStorage.setItem("l2-personal-nav", "status");
        this.shadowRoot.querySelector("l2-personal-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-personal-nav").setAttribute( "selected-button", "Status");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-personal-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_personal_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_personal_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_personal_main_style_show();
    }

    l2_sections_personal_main_style_hide(){
        return `
        :host {
            display: none;
        }
        `;
    }

    l2_sections_personal_main_style_show(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            height: 100%;
        }`;
    }

    template() {
        return `<template id="l2-sections-personal-stage-template">
        <style>${this.l2_sections_personal_main_style_show()}</style>
        <l2-personal-nav></l2-personal-nav>
        <l2-personal-stage></l2-personal-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-personal-main', l2_sections_personal_main)