import {l2_view_button} from "../../../../elements/l2-view-button.js"

export class l2_local_problems_nav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        document.addEventListener("l2-local-problems-edit-local-problem-complete", this.handle_edit_complete.bind(this), true);
        document.addEventListener("l2-local-problems-edit-local-problem-canceled", this.handle_edit_complete.bind(this), true);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.html();
        this.shadowRoot.querySelector("#l2-local-problems-nav-Edit-Problem").setAttribute("show-button", "false");
    }

    static get observedAttributes() {
        return ['selected-button'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected-button' && newValue === 'List Problems') {
            this.shadowRoot.querySelector("#l2-local-problems-nav-List-Problems").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-problems-nav-List-Problems").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Submit Problem') {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Submit-Problem").setAttribute("selected", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Submit-Problem").setAttribute("selected", "false");
        }

        if (name === 'selected-button' && newValue === 'Edit Problem') {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Edit-Problem").setAttribute("selected", "true");
            this.shadowRoot.querySelector("#l2-local-problems-nav-Edit-Problem").setAttribute("show-button", "true");
        } else {
            this.shadowRoot.querySelector("#l2-local-problems-nav-Edit-Problem").setAttribute("selected", "false");
        }
    }

    handle_edit_complete(){
        this.shadowRoot.querySelector("#l2-local-problems-nav-Edit-Problem").setAttribute("show-button", "false");
    }

    css(){
        return `
        :host {
            z-index: 300;
            display: grid;
            grid-template-columns: auto auto auto;
            justify-content: start;
            background: white;
            padding-left: 1vw;
            padding-right: 1vw;
        }`;
    }

    html() {
        return `
        <style>${this.css()}</style>  
        <l2-view-button nav-section="l2-local-problems-nav" name="List Problems"></l2-view-button>
        <l2-view-button nav-section="l2-local-problems-nav" name="Edit Problem"></l2-view-button>
        <l2-view-button nav-section="l2-local-problems-nav" name="Submit Problem"></l2-view-button>
        `;
    }

}

customElements.define("l2-local-problems-nav", l2_local_problems_nav)
