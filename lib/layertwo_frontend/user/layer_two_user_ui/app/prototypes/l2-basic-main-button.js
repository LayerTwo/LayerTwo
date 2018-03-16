export class l2_basic_main_button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.svg_background_color = "background: none;";
        this.border_bottom_style = "border-bottom-style: solid;";
        this.button_name = this.getAttribute('name');
        this.button_nav_section = this.getAttribute('nav-section');
        this.setAttribute("id", `${this.button_nav_section}-${this.button_name}`);
        this.setAttribute("selected", "false");
        this.addEventListener("pointerdown", event => this.emit_button_clicked_event());
    }

    static get observedAttributes() {
        return ['selected'];
    }
    
    emit_button_clicked_event() {
        this.dispatchEvent(new CustomEvent(this.button_nav_section + " " + this.button_name, { bubble: true, composed: true }));
    }

    connectedCallback() {
        this.render_initial_button();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'selected' && oldValue === 'false' && newValue === 'true'){
            this.svg_background_color = "background: DeepSkyBlue;";
            this.border_bottom_style = "border-bottom-style: unset;";
            this.update_button_style();
        }
        if(name === 'selected' && oldValue === 'true' && newValue === 'false'){
            this.svg_background_color = "background: none;";
            this.border_bottom_style = "border-bottom-style: solid;";
            this.update_button_style();
        }
    }

    update_button_style(){
        this.shadowRoot.querySelector("style").innerHTML = this.button_style();
    }

    button_style() {
        return `
        :host {
            margin: 0px;
            padding: 0px;
        }

        #basic_button_container {
            background: white;
            border-radius: 0.15vmax;
            border-left-style: solid;
            border-right-style: solid;
            border-bottom-style: solid;
            ${this.border_bottom_style}
            border-color: LightGrey;
            border-width: thin;
            user-select: none;
            display: flex;
            justify-content: center;
            transition: background 0.3s;
        }           

        #basic_button {
            display: flex;
            align-items: center;
            padding-top: 1vh;
            padding-bottom: 1vh;
        }
        
        #basic_button_name {
            letter-spacing: 0.05em;
            font-family: arial, sans-serif;
            font-size: calc(6px + 0.7vw);
            padding-right: 0.3vw;
            padding-left: 0.3vw;
        }

        #button_svg_icon {
            width: 2.5vw;
            min-width: 2em;
            ${this.svg_background_color}
            border-radius: 3px;
         }
        
         #basic_button_container:hover {
            cursor: pointer;
            color: black;
            background: DeepSkyBlue;
        }
        
        @media screen and (max-width:550px) {
            #basic_button_container {
                padding: unset;
                user-select: none;
                display: flex;
                justify-content: center;
                transition: background 0.3s;
            }

            #basic_button {
                display: flex;
                align-items: center;
                padding-top: unset;
                padding-bottom: unset;
            }

            #basic_button_name {
                display: none;
            }
            
            #button_svg_icon {
                 width: 3vw;
                 min-width: 2em;
                 ${this.svg_background_color}
                 border-radius: 3px;
            }

         }`;
    }

    render_initial_button() {
        this.shadowRoot.innerHTML = `
        <style>${this.button_style()}</style>
        <h6>SVG Placeholder</h6>`;
    }

}

customElements.define("l2-basic-main-button", l2_basic_main_button)