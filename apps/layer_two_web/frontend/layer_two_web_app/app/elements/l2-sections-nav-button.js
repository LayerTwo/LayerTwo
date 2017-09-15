import {l2_basic_button} from "../prototypes/l2-basic-button.js"

export class l2_sections_nav_button extends l2_basic_button{
    button_style(){
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
            margin-top: 0.2em;
            margin-bottom: 0.2em;
            transition: background 0.3s;
        }

        input:hover {
            color: white;
            background: DeepSkyBlue;
            border-color: DeepSkyBlue;
        }
        
        </style>`;
    }

}
customElements.define('l2-sections-nav-button', l2_sections_nav_button)