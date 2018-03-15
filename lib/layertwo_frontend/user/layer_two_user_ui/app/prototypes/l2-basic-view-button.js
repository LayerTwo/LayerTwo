export class l2_basic_view_button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.svg_background_color = "background: none;";
        this.border_bottom_style = "border-bottom-style: solid;";
        this.button_name = this.getAttribute('name');
        this.button_nav_section = this.getAttribute('nav-section');
        this.setAttribute("id", `${this.button_nav_section}-${this.button_name.replace(/\s+/g, '-')}`);
        this.setAttribute("selected", "false");
        this.setAttribute("show-button", "true");
        this.addEventListener("pointerdown", event => this.emit_button_clicked_event());
    }

    static get observedAttributes() {
        return ['selected', 'show-button'];
    }
    
    emit_button_clicked_event() {
        this.dispatchEvent(new CustomEvent(this.button_nav_section + " " + this.button_name, { bubble: true, composed: true }));
    }

    connectedCallback() {
        this.render_initial_button();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'selected' && oldValue === 'false' && newValue === 'true'){
            this.svg_background_color = "background: gold;";
            this.border_bottom_style = "border-bottom-style: unset;";
            this.update_button_style();
        }
        if(name === 'selected' && oldValue === 'true' && newValue === 'false'){
            this.svg_background_color = "background: none;";
            this.border_bottom_style = "border-bottom-style: solid;";
            this.update_button_style();
        }

        if(name === 'show-button' && oldValue === 'false' && newValue === 'true'){
            this.button_visible_css = `display: unset;`;
            this.update_button_style();
        }

        if(name === 'show-button' && oldValue === 'true' && newValue === 'false'){
            this.button_visible_css = `display: none;`;
            this.update_button_style();
        }
    }

    update_button_style(){
        this.shadowRoot.querySelector("style").innerHTML = this.button_style();
    }

    button_style() {
        return `        
        :host {
            ${this.button_visible_css}
            margin: 0px;
            padding: 0px;
        }
        #basic_button_container {
            border-left-style: solid;
            border-right-style: solid;
            border-top-style: solid;
            ${this.border_bottom_style}
            border-color: LightGrey;
            border-width: thin;
            min-width: 9vw;
            user-select: none;
            display: flex;
            justify-content: center;
            padding-top: 1vh;
            padding-bottom: 1vh;
            padding-left: 1vw;
            padding-right: 1vw;
            background: white;
            transition: background 0.3s;
        }           

        #basic_button {
            display: flex;
            align-items: center;
        }
        
        #basic_button_name {
            letter-spacing: 0.05em;
            font-family: arial, sans-serif;
            font-size: calc(6px + 0.7vw);
            padding-right: 0.3vw;
            padding-left: 0.3vw;
        }

        #button_svg_icon {
            width: 2vw;
            min-width: 1.5em;
            border-radius: 3px;
            ${this.svg_background_color}
         }

        #basic_button_container:hover {
            cursor: pointer;
            color: black;
            background: gold;
        }
        
        @media screen and (max-width:550px){
            #basic_button_name {
                letter-spacing: 0.05em;
                font-family: arial, sans-serif;
                font-size: 3.5vw;
                padding-right: 0.3vw;
                padding-left: 0.3vw;
            }

            #button_svg_icon {
                width: 2vw;
                min-width: 1.5em;
                border-radius: 3px;
                ${this.svg_background_color}
             }
        }`;
    }

    render_initial_button() {
        this.shadowRoot.innerHTML = `
        <style>${this.button_style()}</style>
        <h6>SVG Placeholder</h6>`;
    }
}

customElements.define("l2-basic-view-button", l2_basic_view_button)