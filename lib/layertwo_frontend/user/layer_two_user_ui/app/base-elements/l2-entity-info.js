export class l2_entity_info extends HTMLElement {
    constructor() {
        super();
        document.addEventListener("l2-update-entity-basic-info", this.handle_basic_info_update.bind(this), true);
    }

    handle_basic_info_update(){
        this.innerHTML = this.template();
    }

    update_basic_info(){
        return sessionStorage.getItem("entity_name");
    }

    connectedCallback() {
        this.render_template();
    }

    render_template(){
        if(sessionStorage.getItem("entity_name") !== null){
            this.innerHTML = this.template();
        }
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor(){
        return `<div>Welcome ${this.update_basic_info()}!</div>`;
    }

}
customElements.define('l2-entity-info', l2_entity_info)