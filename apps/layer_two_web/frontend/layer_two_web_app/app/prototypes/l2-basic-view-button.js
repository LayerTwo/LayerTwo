export class l2_basic_view_button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.button_background_color = "background: white;";
        this.button_name = this.getAttribute('name');
        this.button_nav_section = this.getAttribute('nav-section');
        this.setAttribute("id", `${this.button_nav_section}-${this.button_name.replace(/\s+/g, '-')}`);
        this.setAttribute("selected", "false");
        this.addEventListener("click", event => this.emit_button_clicked_event());
        this.addEventListener('touchstart', event => this.emit_button_clicked_event(), {passive: true});
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
            this.button_background_color = "background: Chartreuse;";
            this.update_button_style();
        }
        if(name === 'selected' && oldValue === 'true' && newValue === 'false'){
            this.button_background_color = "background: white;";
            this.update_button_style();
        }
    }

    update_button_style(){
        this.shadowRoot.querySelector("style").innerHTML = this.button_style();
    }

    basic_button_container_style(){
        return `
        #basic_button_container {
            min-width: 9vw;
            user-select: none;
            display: flex;
            justify-content: center;
            border-radius: 3px;
            ${this.button_background_color}
            transition: background 0.3s;
        }`;
    }

    basic_button_name_style(){
        return `
        #basic_button_name {
            letter-spacing: 0.05em;
            font-family: arial, sans-serif;
            font-size: 1.1vw;
            padding-right: 0.3vw;
            padding-left: 0.3vw;
        }
        
        @media screen and (max-width:500px){
            #basic_button_name {
                letter-spacing: 0.05em;
                font-family: arial, sans-serif;
                font-size: 3.5vw;
                padding-right: 0.3vw;
                padding-left: 0.3vw;
            }
        }`;
    }

    button_style() {
        return `
        :host {
            margin: 0px;
            padding: 0px;
        }

        ${this.basic_button_container_style()}            

        #basic_button {
            display: flex;
            align-items: center;
        }
        
        ${this.basic_button_name_style()}

        #button_svg_icon {
            width: 2vw;
            min-width: 1.5em;
            border-radius: 3px;
         }

        #basic_button_container:hover {
            cursor: pointer;
            color: black;
            background: Chartreuse;
        }`;
    }

    render_initial_button() {
        this.shadowRoot.innerHTML = `
        <style>${this.button_style()}</style>
        <h6>SVG Placeholder</h6>`;
    }
}