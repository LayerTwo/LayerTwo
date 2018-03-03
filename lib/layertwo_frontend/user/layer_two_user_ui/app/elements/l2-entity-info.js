export class l2_entity_info extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        document.addEventListener("l2-basic-info-update", this.handle_basic_info_update_message.bind(this), true);
    }

    handle_basic_info_update_message(){
        this.shadowRoot.innerHTML = this.html();
    }

    update_basic_info(){
        return sessionStorage.getItem("entity_name");
    }

    connectedCallback() {
        this.render_html();
    }

    render_html(){
        if(sessionStorage.getItem("entity_name") !== null){
            this.shadowRoot.innerHTML = this.html();
        }
    }

    css(){
        return `
        :host {
            justify-self: start;
            font-size: calc(8px + 0.5vw);
            padding-left: 1vw;
           }`;
    }

    html() {
        return `
        <style>${this.css()}</style>
        <div>Welcome ${this.update_basic_info()}!</div>
        `;
    }

}
customElements.define('l2-entity-info', l2_entity_info)