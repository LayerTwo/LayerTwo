export class l2_exit_confirm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        document.addEventListener("l2-exit-button-clicked", this.handle_exit_button_clicked.bind(this), true);
    }

    handle_exit_button_clicked() {
        if (this.exit_warning_element === undefined) {
            this.exit_warning_element = document.createElement("div");
            this.exit_warning_element.innerHTML = `
        <style>
            :host{
            position: absolute;
            display: grid;
            height: 100%;
            width: 100%;
            z-index: 77777777;
            background: white;
            justify-content: center;
            align-content: center;
        }
        #exit-warning-container{
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr;
        }
        #exit-warning-text{
            grid-row: 1;
            grid-column: 1/3;
            font-size: calc(6px + 0.9vw);
        }

        #local-exit-confirm-button{
            grid-row: 2;
            grid-column: 1;
            font-size: calc(6px + 0.9vw);
        }

        #local-exit-cancel-button{
            grid-row: 2;
            grid-column: 2;
            font-size: calc(6px + 0.9vw);
        }

        #local-exit-cancel-button:hover{
            cursor: pointer;
        }

        #local-exit-confirm-button:hover{
            cursor: pointer;
        }

        @media screen and (max-width:550px) {

            #exit-warning-text{
                font-size: 4vw;
            }
    
            #local-exit-confirm-button{
                font-size: 4vw;
            }
    
            #local-exit-cancel-button{
                font-size: 4vw;
            }
        }

        </style>
        <div id="exit-warning-container">
        <div id="exit-warning-text">Are you sure you want to Logout?</div>
        <input id="local-exit-confirm-button" type="button" value="Yes Exit">
        <input id="local-exit-cancel-button" type="button" value="Cancel">
        </div>`
            this.shadowRoot.appendChild(this.exit_warning_element);
            this.shadowRoot.querySelector("#local-exit-cancel-button").addEventListener("pointerdown", event => this.handle_exit_cancel_button_clicked());
            this.shadowRoot.querySelector("#local-exit-confirm-button").addEventListener("pointerdown", event => this.handle_exit_confirm_button_clicked());
        }
    }

    handle_exit_confirm_button_clicked() {
        if (this.exit_confirm !== "true") {
            this.exit_confirm = "true";
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
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

    handle_exit_cancel_button_clicked() {
        this.exit_confirm = "false";
        this.exit_warning_element.remove();
        this.exit_warning_element = undefined;
    }

}
customElements.define("l2-exit-confirm", l2_exit_confirm)