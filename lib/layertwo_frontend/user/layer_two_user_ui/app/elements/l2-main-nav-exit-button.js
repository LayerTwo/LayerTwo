import { l2_basic_main_button } from "../prototypes/l2-basic-main-button.js"

export class l2_main_nav_exit_button extends l2_basic_main_button {

    emit_button_clicked_event() {
        if (confirm("Are you sure you want to Logout?")) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    window.location.reload(true);
                }
              }
            request.open("DELETE", "/", true);            
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader("x-csrf-token", window.csrfToken);
            sessionStorage.clear();
            request.send();
            
        }
    }

    button_style() {
        return `
        :host {
            margin: 0px;
            padding: 0px;
        }

        #basic_button_container {
            height: 98.1%;
            border-left-style: solid;
            border-right-style: solid;
            border-bottom-style: solid;
            ${this.border_bottom_style}
            background: #f8f8f8;
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
            letter-spacing: 0.08em;
            font-family: arial, sans-serif;
            font-size: calc(6px + 0.7vw);
            transform: rotate(-90deg) translate3d( 0, 0, 0);
            padding-right: 0.3vw;
            padding-left: 0.3vw;
        }
        
         #basic_button_container:hover {
            cursor: pointer;
            color: black;
            background: DeepSkyBlue;
        }
        
        @media screen and (max-width:550px) {
            #basic_button_container {
                height: 98.1%;
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
                letter-spacing: 0.05em;
                font-family: arial, sans-serif;
                font-size: calc(6px + 0.7vw);
                padding-right: 0.3vw;
                padding-left: 0.3vw;
            }
         }`;
    }

    render_initial_button() {
        this.shadowRoot.innerHTML = `
        <style>${this.button_style()}</style>
        <div id="basic_button_container">
        <div id="basic_button">
        <div id="basic_button_name">${this.button_name}</div>
        </div>
        </div>`;
    }

}

customElements.define("l2-main-nav-exit-button", l2_main_nav_exit_button)