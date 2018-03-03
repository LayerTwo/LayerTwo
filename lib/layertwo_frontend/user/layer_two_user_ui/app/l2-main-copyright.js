import {l2_entity_info} from "./elements/l2-entity-info.js"

export class l2_main_copyright extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.html();
    }

    css(){
        return `
        :host {
           display: grid;
           grid-template-columns: 1fr max-content;
           background: white;
           margin: 0px;
       }

       #copyright_text {
           justify-self: end;
           font-size: calc(8px + 0.5vw);
           padding-right: 1vw;
       }`;
    }

    html() {
        return `
        <style>${this.css()}</style>
        <l2-entity-info></l2-entity-info>
        <div id="copyright_text">Copyright &copy; Dimitar Yosifov <a target= "_blank" href="https://github.com/LayerTwo/LayerTwo">Source Code</a></div>
        `;
    }

}
customElements.define('l2-main-copyright', l2_main_copyright)
