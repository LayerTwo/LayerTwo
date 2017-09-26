export class l2_personal_stage extends HTMLElement {
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
        let content = document.importNode(this.shadowRoot.querySelector("#l2-personal-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_personal_stage_style_show();
    }
    
    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_personal_stage_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_personal_stage_style_show();
    }

    l2_personal_stage_style_hide(){
        return `
        :host {
            display: none;
            flex-grow: 1;
            flex-direction: column-reverse;
            background: white;
        }
        `;
    }

    l2_personal_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column-reverse;
            background: white;
        }
        
        #personal_stage_svg {
            margin-bottom: 1vh;
        }`
        ;
    }

    l2_personal_stage_default_style(){
        return `
        :host {
            display: none;
            flex-grow: 1;
            flex-direction: column-reverse;
            background: white;
        }
        `;
    }

    template() {
        return `<template id="l2-personal-stage-template">
        <style>${this.l2_personal_stage_default_style()}</style>
        <svg id="personal_stage_svg" version="1.1" viewBox="0 0 1120.3 547.64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="560.17" cy="285.47" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="560.17" cy="308.51" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="560.17" cy="341.05" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"/>
        <path d="m606.95 292.42c0.44633-31.298 3.682-57.092 22.776-78.588 8.7126-14.467 13.093-28.521 14.094-40.961-23.029-14.466-42.462-25.09-63.612-33.485v-18.305c7.614-10.639 11.889-16.771 17.688-25.34 3.1862-15.155 5.6531-31.683 7.8478-45.679s-1.4101-25.452-13.644-36.857c-12.234-11.406-31.928-11.644-31.928-11.644s-19.694 0.238-31.928 11.644c-12.234 11.405-15.839 22.861-13.644 36.857s4.6616 30.524 7.8478 45.679c5.799 8.569 10.074 14.701 17.688 25.34v18.305c-21.15 8.395-40.583 19.019-63.612 33.485 1.001 12.44 5.3814 26.494 14.094 40.961 19.094 21.496 22.33 47.29 22.776 78.588 9.292 11.807 25.178 18.659 46.778 18.033 21.6 0.62607 37.486-6.2263 46.778-18.033z" style="fill:#fff;stroke-width:3.1285;stroke:#000"/>
        </svg>
        </template>
        `;
    }

}
customElements.define('l2-personal-stage', l2_personal_stage)