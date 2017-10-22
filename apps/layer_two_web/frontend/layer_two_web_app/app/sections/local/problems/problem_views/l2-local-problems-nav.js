import {l2_view_button} from "../../../../elements/l2-view-button.js"

export class l2_local_problems_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    static get observedAttributes() {
        return ['selected-button'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected-button' && newValue === 'Problems List') {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Problems-List").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Problems-List").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Submit Problem') {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Submit-Problem").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Submit-Problem").setAttribute("selected", "false");
        }
    }

    l2_local_view_style_show(){
        return `
        :host {
            z-index: 300;
            display: grid;
            grid-template-columns: auto auto;
            grid-column-gap: 1vw;
            justify-content: center;
            background: white;
            padding-bottom: 0.5vh;
        }`;
    }

    template() {
        return `
        <style>${this.l2_local_view_style_show()}</style>  
        <l2-view-button nav-section="l2-local-problems-nav" name="Problems List"></l2-view-button>
        <l2-view-button nav-section="l2-local-problems-nav" name="Submit Problem"></l2-view-button>
        `;
    }

}

customElements.define("l2-local-problems-nav", l2_local_problems_nav)
