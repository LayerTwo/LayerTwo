export class l2_world_stage extends HTMLElement {
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
        let content = document.importNode(this.shadowRoot.querySelector("#l2-world-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_world_stage_style_show();        
    }
    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_world_stage_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_world_stage_style_show();
    }

    l2_world_stage_style_hide(){
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    l2_world_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            background: white;
        }`
        ;
    }

    l2_world_stage_default_style(){
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    template() {
        return `<template id="l2-world-stage-template">
        <style>${this.l2_world_stage_default_style()}</style>
        <svg id="earth_stage_svg" version="1.1" viewBox="0 0 1120.3 478.59" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <ellipse cx="561.33" cy="216.42" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="561.42" cy="239.46" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="560.17" cy="272" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"
        />
        <image x="410.17" width="300" height="300" xlink:href="/images/EarthAnimation.gif" />
        <ellipse cx="560.17" cy="150" rx="139.49" ry="140.96" style="fill:none;opacity:.98;stroke-width:1.8799;stroke:#000" />
        <ellipse cx="560.17" cy="150" rx="147.34" ry="148.9" style="fill:none;opacity:.98;stroke-width:1.5144;stroke:#969696" />
        </svg>
        </template>
        `;
    }

}
customElements.define('l2-world-stage', l2_world_stage)