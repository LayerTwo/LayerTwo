import {l2_basic_button} from "../prototypes/l2-basic-button.js"

export class l2_sections_nav_button extends l2_basic_button{
    button_default_style(){
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
            padding-top: 1vh;
            padding-bottom: 1vh;
            margin-right: 0.8vw;
            margin-left: 0.8vw;
            margin-top: 1.5vh;
            margin-bottom: 1.5vh;
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