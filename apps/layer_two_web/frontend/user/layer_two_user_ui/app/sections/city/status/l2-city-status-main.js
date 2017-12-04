import {l2_city_leaflet_map} from "../../../elements/l2-city-leaflet-map.js"

export class l2_city_status_main extends HTMLElement {
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
            window.dispatchEvent(new Event('resize'));
            this.render_template();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            window.dispatchEvent(new Event('resize'));
            this.show_template();
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-city-view-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_city_view_style_show();
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_city_view_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_city_view_style_show();
    }

    l2_city_view_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    l2_city_view_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 100%;
            background: white;
            padding-right: 1vw;
            padding-left: 1vw;
        }

        l2-city-leaflet-map {
            position: absolute;
            align-self: center;
            height: 43vmin;
            width: 33vw;
            padding-bottom: 36vmin;
        }
        
        #l2-city-status-rings {
            width: 100%;
            height: 100%;
        }`;
    }

    template() {
        return `<template id="l2-city-view-template">
        <style>${this.l2_city_view_style_show()}</style>
        <l2-city-leaflet-map></l2-city-leaflet-map>
        <svg id="l2-city-status-rings" version="1.1" viewBox="0 0 1119.2297 523.22966" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="559.61487" cy="261.61484" rx="275.82001" ry="93.360001" style="fill:none;opacity:.98000004;stroke-dasharray:15.11811024, 3.77952756, 1.88976378, 3.77952756;stroke-width:1.8897638;stroke:#969696"/>
        <ellipse cx="559.61487" cy="284.65485" rx="398.64001" ry="150.24001" style="fill:none;opacity:.98000004;stroke-dasharray:15.11811024, 3.77952756, 1.88976378, 3.77952756;stroke-width:1.8897638;stroke:#969696"/>
        <ellipse cx="559.61487" cy="317.19482" rx="558.66998" ry="205.09" style="fill:none;opacity:.98000004;stroke-dasharray:15.11811024, 3.77952756, 1.88976378, 3.77952756;stroke-width:1.8897638;stroke:#989898"/>
        </svg>
        </template>
        `;
    }

}

customElements.define("l2-city-status-main", l2_city_status_main)