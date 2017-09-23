export class l2_social_stage extends HTMLElement {
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

    render_template() {
        let content = document.importNode(this.shadowRoot.querySelector("#l2-social-stage-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_social_stage_style_show();
        
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_social_stage_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_social_stage_style_show();
    }

    l2_social_stage_style_hide(){
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    l2_social_stage_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: column;
            background: white;
        }`
        ;
    }

    l2_social_stage_default_style() {
        return `
        :host {
            display: none;
            flex-direction: column;
            background: white;
        }
        `;
    }

    template() {
        return `<template id="l2-social-stage-template">
        <style>${this.l2_social_stage_default_style()}</style>
        <svg version="1.1" viewBox="0 0 1120.3 561.64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="561.33" cy="299.47" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="561.42" cy="322.51" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="560.17" cy="355.05" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"/>
        <path d="m580.08 11.85c5.3088 8.0126 7.3328 17.139 5.3494 25.953-1.8589 8.2599-3.6004 15.103-5.2586 22.99-3.0181 4.46-5.2429 7.651-9.2055 13.188v10.729c11.008 4.3681 25.122 9.8979 37.106 17.427l47.553 62.889c0.65638 0.92617 1.0605 1.3823 1.0464 1.9959-0.0141 0.61357-0.0807 1.0494-0.87572 1.4821l-11.926 7.3061c-1.0564 0.52122-1.6675 0.74326-2.5938 0.65436-0.92624-0.0889-1.2106-0.60973-1.7629-1.2248l-38.776-51.785c-11.971 13.476-12.793 32.345-13.949 51.49l-0.0446 11.078 31.187 152.17c0.28927 1.5244 0.44649 2.0637 0.12186 2.7176-0.34397 0.6929-1.1487 0.90687-2.3731 0.81418l-21.469-1.5118c-1.8947-0.22291-3.3877-0.26512-4.0918-0.78433-0.70408-0.51917-0.78282-1.0259-1.1759-2.2949l-25.74-114.69c-0.43633-1.8275-1.1374-3.7135-3.0556-3.8574-1.9182 0.14392-2.6192 2.0299-3.0556 3.8574l-25.74 114.69c-0.39306 1.269-0.4718 1.7757-1.1759 2.2949-0.7041 0.51921-2.197 0.56142-4.0918 0.78433l-21.469 1.5118c-1.2244 0.0927-2.0291-0.12128-2.3731-0.81418-0.32463-0.65387-0.16741-1.1931 0.12186-2.7176l31.187-152.17-0.0446-11.078c-1.1566-19.145-1.9786-38.014-13.949-51.49l-38.776 51.785c-0.55232 0.61509-0.83663 1.1359-1.7629 1.2248-0.92627 0.0889-1.5374-0.13314-2.5938-0.65436l-11.926-7.3061c-0.79502-0.43273-0.86162-0.86854-0.87572-1.4821-0.0141-0.61356 0.38999-1.0697 1.0464-1.9959l47.553-62.889c11.985-7.5287 26.099-13.058 37.106-17.427v-10.729c-3.9626-5.537-6.1874-8.728-9.2055-13.188-1.6582-7.8872-3.3996-14.73-5.2586-22.99-1.9834-8.8134 0.0406-17.94 5.3494-25.953 7.7883-11.652 19.934-11.032 19.934-11.032s12.145-0.61953 19.934 11.032z" style="fill:#fff;stroke-width:1.6282;stroke:#000"/>
        </svg>       
        </template>
        `;
    }

}
customElements.define('l2-social-stage', l2_social_stage)