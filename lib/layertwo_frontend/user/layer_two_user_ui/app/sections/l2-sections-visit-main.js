import { l2_visit_nav } from "./visit/l2-visit-nav.js"
import { l2_visit_stage } from "./visit/l2-visit-stage.js"


export class l2_sections_visit_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-visit-nav Eco", this.show_visit_view_eco);
        this.addEventListener("l2-visit-nav Historic", this.show_visit_view_historic);
        this.addEventListener("l2-visit-nav Islands", this.show_visit_view_islands);
        this.addEventListener("l2-visit-nav Mountains", this.show_visit_view_mountains);
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
            this.l2_visit_nav_state();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    l2_visit_nav_state(){
        switch (sessionStorage.getItem("l2-visit-nav")) {
            case "eco":
                this.show_visit_view_eco();
                break;

            case "historic":
                this.show_visit_view_historic();
                break;

            case "islands":
                this.show_visit_view_islands();
                break;

            case "mountains":
                this.show_visit_view_mountains();
                break;
            default:
                this.show_visit_view_islands();
        }
    }
    
    show_visit_view_eco() {
        sessionStorage.setItem("l2-visit-nav", "eco");
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Eco");
        this.shadowRoot.querySelector("l2-visit-nav").setAttribute( "selected-button", "Eco");
    }

    show_visit_view_historic() {
        sessionStorage.setItem("l2-visit-nav", "historic");
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Historic");
        this.shadowRoot.querySelector("l2-visit-nav").setAttribute( "selected-button", "Historic");
    }

    show_visit_view_islands() {
        sessionStorage.setItem("l2-visit-nav", "islands");
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Islands");
        this.shadowRoot.querySelector("l2-visit-nav").setAttribute( "selected-button", "Islands");
    }

    show_visit_view_mountains() {
        sessionStorage.setItem("l2-visit-nav", "mountains");
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Mountains");
        this.shadowRoot.querySelector("l2-visit-nav").setAttribute( "selected-button", "Mountains");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-visit-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_visit_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_visit_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_visit_main_style_show();
    }

    l2_sections_visit_main_style_hide(){
        return `
        :host {
            display: none;
        }
        `;
    }

    l2_sections_visit_main_style_show(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            height: 100%;
        }`;
    }

    template() {
        return `<template id="l2-sections-visit-stage-template">
        <style>${this.l2_sections_visit_main_style_show()}</style>
        <l2-visit-nav></l2-visit-nav>
        <l2-visit-stage></l2-visit-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-visit-main', l2_sections_visit_main)