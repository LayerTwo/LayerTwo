import {l2_local_leaflet_map} from "../../../../../elements/l2-local-leaflet-map.js"

export class l2_local_problems_list extends HTMLElement {
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
            grid-template-rows: 1fr auto 1fr;
            align-items: center;
            height: 100%;
            background: white;
            padding-right: 1vw;
            padding-left: 1vw;
        }
        `;
    }

    template() {
        return `<template id="l2-local-view-template">
        <style>${this.l2_local_view_style_show()}</style>
        <h6>Problems List</h6>
        </template>
        `;
    }

}

customElements.define("l2-local-problems-list", l2_local_problems_list)
