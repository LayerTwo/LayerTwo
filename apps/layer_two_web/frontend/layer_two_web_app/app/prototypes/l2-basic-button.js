export class l2_basic_button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.button_name = this.getAttribute('name');
        this.button_nav_section = this.getAttribute('nav-section');
        this.addEventListener("click", event => this.emit_button_clicked_event());
        this.addEventListener('touchstart', event => this.emit_button_clicked_event());
    }


    emit_button_clicked_event() {
        this.dispatchEvent(new CustomEvent(this.button_nav_section + " " + this.button_name, { bubble: true, composed: true }));
    }

    button_style() {
        return `
        <style>
        :host {
            margin: 0px;
            padding: 0px;
        }
        
        @font-face {
            font-family: "Open Sans SemiBold";
            src: url("/fonts/OpenSans-SemiBold.ttf") format("truetype");
        }
        
        input {
            width: 8em;
            letter-spacing: 0.07em;
            font-family: 'Open Sans SemiBold', sans-serif;
            color: black;
            border-style: double;
            background: white;
            border-color: rgba(225, 225, 225, 1);
            padding-top: 0.1em;
            padding-bottom: 0.15em;
            margin-right: 0.2em;
            margin-left: 0.2em;
            transition: background 0.3s;
        }

        input:hover {
            color: white;
            background: DeepSkyBlue;
            border-color: DeepSkyBlue;
        }
        
        </style>`;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }



    template() {
        return `
        <input type="button" value="${this.button_name}">
        ` + this.button_style();
    }

}
