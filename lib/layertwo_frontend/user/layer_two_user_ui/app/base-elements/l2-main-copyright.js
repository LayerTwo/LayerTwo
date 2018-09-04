import { l2_entity_info } from "../base-elements/l2-entity-info.js"

export class l2_main_copyright extends HTMLElement {
    constructor() {
        super();
        document.addEventListener('l2-main-copyright-mbox', this.handle_mbox_message.bind(this), true);
    }

    handle_mbox_message(event){

    }

    connectedCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `
        <l2-entity-info></l2-entity-info>
        <div id="l2-copyright-text">Copyright &copy; Dimitar Yosifov <a target= "_blank" href="https://github.com/yosifovdimitar/LayerTwo">Source Code</a></div>
        `;
    }

}
customElements.define('l2-main-copyright', l2_main_copyright)
