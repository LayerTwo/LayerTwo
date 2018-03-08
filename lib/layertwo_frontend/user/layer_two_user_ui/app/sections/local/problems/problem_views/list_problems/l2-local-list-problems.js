import { l2_local_leaflet_map_list_problems } from "../../../../../elements/l2-local-leaflet-map-list-problems.js"
import { l2_local_list_problems_display } from "../../../../../elements/l2-local-list-problems-display.js"

export class l2_local_list_problems extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
        document.addEventListener("l2-city-local-init-problems-list", this.set_number_of_problems.bind(this), true);
        document.addEventListener("l2-city-local-update-problems-count", this.set_number_of_problems_after_deletion.bind(this), true);
        document.addEventListener("l2-local-problems-list-scroll-to-element", this.handle_scroll_to_element.bind(this), true);
        let content = document.importNode(this.shadowRoot.querySelector("#l2-local-view-template").content, true);
        this.shadowRoot.appendChild(content);
    }

    handle_scroll_to_element(data) {
        this.shadowRoot.querySelector("#problems_list_container").scrollTop = data.detail.element_offset;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'render-template' && oldValue === 'false' && newValue === 'true') {
            this.render_template();
            window.dispatchEvent(new Event('resize'));
        }
        if (name === 'show-template' && oldValue === 'false' && newValue === 'true') {
            this.show_template();
            window.dispatchEvent(new Event('resize'));
        }
        if (name === 'show-template' && oldValue === 'true' && newValue === 'false') {
            this.hide_template();
        }
    }

    render_template() {
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
        this.dispatchEvent(new CustomEvent("l2-local-list-problems-display-data-request", { bubble: true, composed: true }));
    }

    hide_template() {
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_hide();
    }

    show_template() {
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    set_number_of_problems(data) {
        this.current_problem_count = data.detail.local_problems_init_list.length;
        if (data.detail.local_problems_init_list.length === 0) {
            this.shadowRoot.querySelector("#l2-city-local-problems-display-count").innerHTML = "There are no local problems at the moment.";
        } else {
            this.shadowRoot.querySelector("#l2-city-local-problems-display-count").innerHTML = "Current problems: " + this.current_problem_count;
        }

    }

    set_number_of_problems_after_deletion(data) {
        if (data.detail.remove_one === "true") {
            this.shadowRoot.querySelector("#l2-city-local-problems-display-count").innerHTML = "Current problems: " + (this.current_problem_count - 1);
        }
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
            grid-gap: 1%;
            display: grid;
            grid-template-rows: 0.07fr 1fr;
            grid-template-columns: 1fr 1fr;
            height: 100%;
            background: white;
            padding-right: 1vw;
            padding-top: 1vh;
            padding-left: 1vw;
        }

        #problems_list_container {
            grid-row: 2;
            grid-column: 1;
            width: 100%;
            font-size: calc(6px + 0.7vw);
            justify-self: center;
            overflow-y: scroll;
            overflow-x: hidden;
        }

        #leaflet-map{
            grid-row: 1/3;
            grid-column: 2;
        }

        #l2-city-local-problems-list-heading{
            grid-row: 1;
            grid-column: 1;
            font-size: calc(6px + 1vw);
            justify-self: center;
        }

        #problems-count-and-heading-container{
            grid-row: 1;
            grid-column: 1;
            display: grid;
        }

        #l2-city-local-problems-display-count{
            font-size: calc(6px + 0.5vw);
        }

        @media screen and (max-width:550px){
            :host {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 0.07fr 1fr 1fr;
                height: 100%;
                background: white;
                padding-right: 1vw;
                padding-top: 1vh;
                padding-left: 1vw;
            }

            #problems_list_container {
                grid-row: 2;
                grid-column: 1;
                width: 100%;
                font-size: 3vw;
                justify-self: center;
                overflow-y: scroll;
                overflow-x: hidden;
            }

            #leaflet-map{
                grid-row: 3;
                grid-column: 1;
            }
    
            #l2-city-local-problems-list-heading{
                grid-row: 1;
                grid-column: 1;
                font-size: 4vw;
                justify-self: center;
            }
    
            #problems-count-and-heading-container{
                grid-row: 1;
                grid-column: 1;
                display: grid;
            }
    
            #l2-city-local-problems-display-count{
                font-size: 3vw;
            }
    
        }`;
    }

    template() {
        return `<template id="l2-local-view-template">
        <style>${this.l2_local_view_style_hide()}</style>
        <div id="problems-count-and-heading-container">
        <div id="l2-city-local-problems-list-heading">Local Problems List</div>
        <div id="l2-city-local-problems-display-count"></div>
        </div>
        <div id="problems_list_container">
        <l2-local-list-problems-display></l2-local-list-problems-display>
        </div>
        <div id="leaflet-map">
        <l2-local-leaflet-map-list-problems></l2-local-leaflet-map-list-problems>
        </div>
        </template>
        `;
    }

}

customElements.define("l2-local-list-problems", l2_local_list_problems)
