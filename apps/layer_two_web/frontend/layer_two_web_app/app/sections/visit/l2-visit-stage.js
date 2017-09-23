export class l2_visit_stage extends HTMLElement {
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
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            this.show_template();
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-visit-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_visit_stage_style_show();      
    }
    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_visit_stage_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_visit_stage_style_show();
    }

    l2_visit_stage_style_hide(){
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    l2_visit_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            background: white;
        }`
        ;
    }

    l2_visit_stage_default_style(){
        return `
        :host {
            flex-direction: column;
            background: white;
        }
        `;
    }

    template() {
        return `<template id="l2-visit-stage-template">
        <style>${this.l2_visit_stage_default_style()}</style>
        <h1>Visit Stage</h1>
        </template>
        `;
    }

}
customElements.define('l2-visit-stage', l2_visit_stage)