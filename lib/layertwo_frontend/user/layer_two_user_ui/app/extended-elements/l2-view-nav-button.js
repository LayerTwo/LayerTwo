import { l2_basic_nav_button } from "../base-elements/l2-basic-nav-button.js"

export class l2_view_nav_button extends l2_basic_nav_button{
    constructor(){
        super();
        this.button_type = 'view';
    }

}

customElements.define('l2-view-nav-button', l2_view_nav_button)