import { l2_main_nav_button } from "../extended-elements/l2-main-nav-button.js"
import { l2_main_nav_exit_button } from "../extended-elements/l2-main-nav-exit-button.js"

export class l2_main_nav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.set_default_section();
    }    
    
    set_default_section(){
        if(sessionStorage.getItem("l2-Main-nav") === null){
            document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: "Personal", button_section: "Main" }, bubble: true, composed: true }));
        }
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `
        <l2-main-nav-button section="Main" name="Personal"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="Social"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="Local"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="City"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="Country"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="World"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="Space"></l2-main-nav-button>
        <l2-main-nav-button section="Main" name="Visit"></l2-main-nav-button>
        <l2-main-nav-exit-button section="Main" name="Exit"></l2-main-nav-exit-button>
        `;
    }

}
customElements.define('l2-main-nav', l2_main_nav)
