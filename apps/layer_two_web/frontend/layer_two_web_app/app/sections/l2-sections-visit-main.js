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

    
    show_visit_view_eco() {
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Eco");
    }

    show_visit_view_historic() {
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Historic");
    }

    show_visit_view_islands() {
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Islands");
    }

    show_visit_view_mountains() {
        this.shadowRoot.querySelector("l2-visit-stage").setAttribute( "display-view", "Mountains");
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
            background: white;
        }
        `;
    }

    l2_sections_visit_main_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: min-content auto;
            height: 100%;
            background: white;
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