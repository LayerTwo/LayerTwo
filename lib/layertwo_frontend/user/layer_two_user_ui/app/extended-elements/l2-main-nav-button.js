import { l2_basic_nav_button } from "../base-elements/l2-basic-nav-button.js"

export class l2_main_nav_button extends l2_basic_nav_button{
    constructor(){
        super();
        this.button_type = 'main';
    }

}
customElements.define('l2-main-nav-button', l2_main_nav_button)