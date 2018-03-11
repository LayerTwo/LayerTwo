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
        this.addEventListener("l2-local-problems-nav Edit Problem", this.show_local_view_edit_problem);
        document.addEventListener("l2-local-problems-edit-local-problem", this.show_local_view_edit_problem.bind(this), true);
        document.addEventListener("l2-local-problems-edit-local-problem-complete", this.show_local_view_list_problems_and_highlight_updated.bind(this), true);
        document.addEventListener("l2-local-problems-edit-local-problem-canceled", this.show_local_view_list_problems.bind(this), true);
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }

    connectedCallback() {
        this.edit_complete === "neutral";
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'render-template' && oldValue === 'false' && newValue === 'true') {
            window.dispatchEvent(new Event('resize'));
            this.render_template();
            this.l2_local_problems_nav_state();
        }
        if (name === 'show-template' && oldValue === 'false' && newValue === 'true') {
            window.dispatchEvent(new Event('resize'));
            this.show_template();
        }
        if (name === 'show-template' && oldValue === 'true' && newValue === 'false') {
            this.hide_template();
        }
    }

    l2_local_problems_nav_state() {
        switch (sessionStorage.getItem("l2-local-problems-nav")) {
            case "list-problems":
                this.show_local_view_list_problems();
                break;

            case "submit-problem":
                this.show_local_view_submit_problem();
                break;

            case "edit-problem":
                this.show_local_view_list_problems();
                break;

            default:
                this.show_local_view_list_problems();
        }
    }

    show_local_view_list_problems() {
        sessionStorage.setItem("l2-local-problems-nav", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "List Problems");
    }

    show_local_view_list_problems_and_highlight_updated(data) {
        sessionStorage.setItem("l2-local-problems-nav", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "list-problems");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "List Problems");
        this.dispatchEvent(new CustomEvent("l2-local-problems-list-highlight-updated-element", {detail:{local_problem_uuid: data.detail.local_problem_uuid}, bubble: true, composed: true}));
    }

    show_local_view_submit_problem() {
        sessionStorage.setItem("l2-local-problems-nav", "submit-problem");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "submit-problem");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "Submit Problem");
    }

    show_local_view_edit_problem() {
        sessionStorage.setItem("l2-local-problems-nav", "edit-problem");
        this.shadowRoot.querySelector("l2-local-problems-stage").setAttribute("display-view", "edit-problem");
        this.shadowRoot.querySelector("l2-local-problems-nav").setAttribute("selected-button", "Edit Problem");
    }

    render_template() {
        let content = document.importNode(this.shadowRoot.querySelector("#l2-local-view-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    hide_template() {
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_hide();
    }

    show_template() {
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    l2_local_view_style_hide() {
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_local_view_style_show() {
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
