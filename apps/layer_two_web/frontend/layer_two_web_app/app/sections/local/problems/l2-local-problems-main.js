import { l2_local_problems_nav } from "./problem_views/l2-local-problems-nav.js"
import { l2_local_problems_stage } from "./problem_views/l2-local-problems-stage.js"


export class l2_local_problems_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-local-problems-nav List Problems", this.show_local_view_list_problems);
        this.addEventListener("l2-local-problems-nav Submit Problem", this.show_local_view_submit_problem);
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
            this.l2_local_problems_nav_state();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
            window.dispatchEvent(new Event('resize'));
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    l2_local_problems_nav_state() {
        switch (localStorage.getItem("l2-local-problems-nav")) {
            case "list-problems":
                this.show_local_view_list_problems();
            break;

            case "submit-problem":
                this.show_local_view_submit_problem();
                break;
            default:
                this.show_local_view_list_problems();
        }
    }

    show_local_view_list_problems() {
        localStorage.setItem("l2-local-problems-nav", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "Problems List");
    }

    show_local_view_submit_problem() {
        localStorage.setItem("l2-local-problems-nav", "submit-problem");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "submit-problem");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "Submit Problem");
    }

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-local-view-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    l2_local_view_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_local_view_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: minmax(auto, max-content) auto;
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `<template id="l2-local-view-template">
        <style>${this.l2_local_view_style_show()}</style>
        <l2-local-problems-nav></l2-local-problems-nav>
        <l2-local-problems-stage></l2-local-problems-stage>
        </template>
        `;
    }

}

customElements.define("l2-local-problems-main", l2_local_problems_main)
