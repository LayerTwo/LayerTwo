export class l2_country_updates extends HTMLElement {
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
        let content = document.importNode(this.shadowRoot.querySelector("#l2-country-updates-template").content, true);
        return this.shadowRoot.appendChild(content);
    }

    template() {
        return `
        <template id="l2-country-updates-template">
        <h1>Country Updates</h1>
        </template>
        ` + this.l2_sections_nav_style();
    }

}
customElements.define('l2-country-updates', l2_country_updates)