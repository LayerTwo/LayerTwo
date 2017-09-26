export class l2_main_copyright extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_main_copyright_default_style(){
        return `<style>
        :host {
           display: flex;
           flex-direction: row;
           flex-wrap: nowrap;
           justify-content: center;
           align-items: center;
           background: white;
           margin: 0px;
       }

       #copyright_text{
           font-size: 0.7em;
       }
       </style>`;
    }

    template() {
        return `
        <div id="copyright_text">Copyright &copy; Dimitar Yosifov 2016-${new Date().getFullYear()} <a target= "_blank" href="https://github.com/LayerTwo/LayerTwo">Source Code</a></div>
        ` + this.l2_main_copyright_default_style();
    }

}
customElements.define('l2-main-copyright', l2_main_copyright)