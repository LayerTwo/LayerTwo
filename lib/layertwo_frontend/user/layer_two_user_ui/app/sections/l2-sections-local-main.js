import { l2_local_nav } from "./local/l2-local-nav.js"
import { l2_local_stage } from "./local/l2-local-stage.js"


export class l2_sections_local_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-local-nav Authorities", this.show_local_view_authorities);
        this.addEventListener("l2-local-nav Businesses", this.show_local_view_businesses);
        this.addEventListener("l2-local-nav Events", this.show_local_view_events);
        this.addEventListener("l2-local-nav Goals", this.show_local_view_goals);
        this.addEventListener("l2-local-nav Problems", this.show_local_view_problems);
        this.addEventListener("l2-local-nav Projects", this.show_local_view_projects);
        this.addEventListener("l2-local-nav Status", this.show_local_view_status);
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'render-template' && oldValue === 'false' && newValue === 'true'){
            window.dispatchEvent(new Event('resize'));
            this.render_template();
            this.l2_local_nav_state();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            window.dispatchEvent(new Event('resize'));
            this.show_template();            
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    l2_local_nav_state(){
        switch (sessionStorage.getItem("l2-local-nav")) {
            case "authorities":
                this.show_local_view_authorities();
                break;

            case "businesses":
                this.show_local_view_businesses();
                break;

            case "events":
                this.show_local_view_events();
                break;

            case "goals":
                this.show_local_view_goals();
                break;

            case "problems":
                this.show_local_view_problems();
                break;

            case "projects":
                this.show_local_view_projects();
                break;

            case "status":
                this.show_local_view_status();
                break;
            default:
                this.show_local_view_status();
        }
    }

    
    show_local_view_authorities() {
        sessionStorage.setItem("l2-local-nav", "authorities");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Authorities");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Authorities");
    }

    show_local_view_businesses() {
        sessionStorage.setItem("l2-local-nav", "businesses");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Businesses");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Businesses");
    }

    show_local_view_events() {
        sessionStorage.setItem("l2-local-nav", "events");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Events");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Events");
    }

    show_local_view_goals() {
        sessionStorage.setItem("l2-local-nav", "goals");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Goals");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Goals");
    }

    show_local_view_problems() {
        sessionStorage.setItem("l2-local-nav", "problems");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Problems");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Problems");
    }

    show_local_view_projects() {
        sessionStorage.setItem("l2-local-nav", "projects");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Projects");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Projects");
    }

    show_local_view_status() {
        sessionStorage.setItem("l2-local-nav", "status");
        this.shadowRoot.querySelector("l2-local-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-local-nav").setAttribute( "selected-button", "Status");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-local-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_local_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_local_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_local_main_style_show();
    }

    l2_sections_local_main_style_hide(){
        return `
        :host {
            display: none;
        }
        `;
    }

    l2_sections_local_main_style_show(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            height: 100%;
        }`;
    }

    template() {
        return `<template id="l2-sections-local-stage-template">
        <style>${this.l2_sections_local_main_style_show()}</style>
        <l2-local-nav></l2-local-nav>
        <l2-local-stage></l2-local-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-local-main', l2_sections_local_main)