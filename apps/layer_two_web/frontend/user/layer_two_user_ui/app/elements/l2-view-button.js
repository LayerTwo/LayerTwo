import {l2_basic_view_button} from "../prototypes/l2-basic-view-button.js"

export class l2_view_button extends l2_basic_view_button {

    render_initial_button() {
        this.shadowRoot.innerHTML = `
        <style>${this.button_style()}</style>
        <div id="basic_button_container">
          <div id="basic_button">
            <svg id="button_svg_icon" version="1.1" viewBox="0 0 432.32736 432.32735" xmlns="http://www.w3.org/2000/svg">
            <circle cx="216.16368" cy="216.16368" r="128.97687" style="fill:#fff;stroke-width:12.7;stroke:#000"/>
            <path d="m129.53743 215.51602a42.09874 42.09874 0 0 1-42.09874 42.09874 42.09874 42.09874 0 0 1-42.098739-42.09874 42.09874 42.09874 0 0 1 42.098739-42.09874 42.09874 42.09874 0 0 1 42.09874 42.09874zm257.44998.64766a42.09874 42.09874 0 0 1-42.09874 42.09874 42.09874 42.09874 0 0 1-42.09874-42.09874 42.09874 42.09874 0 0 1 42.09874-42.09874 42.09874 42.09874 0 0 1 42.09874 42.09874z"/>
            </svg>
            <div id="basic_button_name">${this.button_name}</div>
          </div>
        </div>`;
    }

}

customElements.define("l2-view-button", l2_view_button)