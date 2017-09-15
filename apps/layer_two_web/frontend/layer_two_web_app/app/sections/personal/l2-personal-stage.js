export class l2_personal_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("style", "display: none;")
    }

    static get observedAttributes() {
        return ['render-template'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_sections_nav_style(){
        return `<style>
        :host {
            flex-direction: column;
            background: white;
        }
        </style>`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'render-template' && oldValue !== 'true' && newValue === 'true'){
            this.render_template();
        }
    }

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-personal-stage-template").content, true);
        return this.shadowRoot.appendChild(content);
    }

    template() {
        return `<template id="l2-personal-stage-template">
        <svg id="personal_stage_svg" version="1.1" viewBox="0 0 1120.3 551.89" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="561.33" cy="289.72" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="561.42" cy="312.76" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="560.17" cy="345.3" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"
        />
        <path d="m513.5 296.9c-1.9643-32.517-3.3605-64.565-23.692-87.453-5.2223-9.8564-10.257-23.281-12.459-36.208 20.355-12.787 44.327-22.179 63.023-29.598v-18.223c-6.7303-9.4042-10.509-14.824-15.635-22.399-2.8164-13.396-5.7741-25.018-8.9314-39.047-3.3687-14.969 0.0689-30.47 9.0857-44.079 13.228-19.79 35.264-18.889 35.264-18.889s22.036-0.90091 35.264 18.889c9.0168 13.61 12.454 29.111 9.0857 44.079-3.1573 14.028-6.115 25.65-8.9314 39.047-5.1257 7.5747-8.9049 12.995-15.635 22.399v18.223c18.696 7.4187 42.667 16.811 63.023 29.598-2.2017 12.928-7.2367 26.352-12.459 36.208-20.332 22.889-21.728 54.936-23.692 87.453-10.349 11.89-23.793 17.422-46.655 18.048-22.861-0.62652-36.306-6.1586-46.655-18.048z"
            style="fill:#fff;stroke-width:2;stroke:#000" />
        </svg>
        </template>
        ` + this.l2_sections_nav_style();
    }

}
customElements.define('l2-personal-stage', l2_personal_stage)