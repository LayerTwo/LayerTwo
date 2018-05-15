import { l2_section_nav } from "./l2-section-nav.js"
import { l2_section_stage } from "./l2-section-stage.js"


export class l2_section_main extends HTMLElement {
    constructor() {
        super();
        document.addEventListener(`l2-nav-button-clicked`, this.handle_clicked_event.bind(this), true);
        this.section_name = this.getAttribute('section');
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
        this.set_default_view();
    }    
    
    set_default_view(){
        if(sessionStorage.getItem("l2-Main-nav") === null){
            document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: "Personal", button_section: "Main" }, bubble: true, composed: true }));
        }
    }

    initial_state(){
        if( sessionStorage.getItem("l2-Main-nav") === this.section_name){
            this.state_show();
        } else {
            this.state_hide();
        }
    }

    handle_clicked_event(event) {
        if (event.detail.button_name === this.section_name
            && event.detail.button_section === 'Main') {
            this.state_show();
        } else if(event.detail.button_name !== this.section_name
            && event.detail.button_section === 'Main'){
            this.state_hide();
        }
    }

    state_show() {
        this.classList.remove('hide-element');
        this.classList.add('show-element-flex');
    }

    state_hide() {
        this.classList.remove('show-element-flex');
        this.classList.add('hide-element');
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `<l2-section-nav section="${this.section_name}"></l2-section-nav>
                <l2-section-stage section="${this.section_name}"></l2-section-stage>`
    }

}

customElements.define('l2-section-main', l2_section_main)