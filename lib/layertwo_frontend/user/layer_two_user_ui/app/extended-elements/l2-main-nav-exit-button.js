import { l2_basic_nav_button } from "../base-elements/l2-basic-nav-button.js"

export class l2_main_nav_exit_button extends l2_basic_nav_button {
    constructor(){
        super();
        this.button_type = 'exit';
    }

    button_clicked() {
        this.dispatchEvent(new CustomEvent("l2-exit-button-clicked", { bubble: true, composed: true }));
    }

    state_normal() {
        this.querySelector(`#l2-${this.button_type}-nav-button-container`)
                       .setAttribute('class',`l2-${this.button_type}-nav-button-container not-selectable`);
        this.button_state = 'normal';
    }

    state_selected() {
        this.querySelector(`#l2-${this.button_type}-nav-button-container`)
                       .setAttribute('class',`l2-${this.button_type}-nav-button-container l2-${this.button_type}-nav-container-selected not-selectable`);
        this.button_state = 'selected';
    }

    html_constructor() {
        return `<div id="l2-${this.button_type}-nav-button-container" class="l2-${this.button_type}-nav-button-container not-selectable">
        <div class="l2-${this.button_type}-nav-button">
        ${this.html_button_name()}
        </div>
        </div>`;
    }

}

customElements.define("l2-main-nav-exit-button", l2_main_nav_exit_button)