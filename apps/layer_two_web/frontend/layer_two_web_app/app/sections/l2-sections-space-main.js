import { l2_space_nav } from "./space/l2-space-nav.js"
import { l2_space_stage } from "./space/l2-space-stage.js"


export class l2_sections_space_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-space-nav Goals", this.show_space_view_goals);
        this.addEventListener("l2-space-nav Missions", this.show_space_view_missions);
        this.addEventListener("l2-space-nav Projects", this.show_space_view_projects);
        this.addEventListener("l2-space-nav Status", this.show_space_view_status);
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

    
    show_space_view_goals() {
        this.shadowRoot.querySelector("l2-space-stage").setAttribute( "display-view", "Goals");
        this.shadowRoot.querySelector("l2-space-nav").setAttribute( "selected-button", "Goals");
    }

    show_space_view_missions() {
        this.shadowRoot.querySelector("l2-space-stage").setAttribute( "display-view", "Missions");
        this.shadowRoot.querySelector("l2-space-nav").setAttribute( "selected-button", "Missions");
    }

    show_space_view_projects() {
        this.shadowRoot.querySelector("l2-space-stage").setAttribute( "display-view", "Projects");
        this.shadowRoot.querySelector("l2-space-nav").setAttribute( "selected-button", "Projects");
    }

    show_space_view_status() {
        this.shadowRoot.querySelector("l2-space-stage").setAttribute( "display-view", "Status");
        this.shadowRoot.querySelector("l2-space-nav").setAttribute( "selected-button", "Status");
    }
    

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-sections-space-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_space_main_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_space_main_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_sections_space_main_style_show();
    }

    l2_sections_space_main_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_sections_space_main_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: min-content auto;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `<template id="l2-sections-space-stage-template">
        <style>${this.l2_sections_space_main_style_show()}</style>
        <l2-space-nav></l2-space-nav>
        <l2-space-stage></l2-space-stage>
        </template>
        `;
    }

}

customElements.define('l2-sections-space-main', l2_sections_space_main)