export class l2_exit_confirm extends HTMLElement {
    constructor() {
        super();
        document.addEventListener("l2-exit-button-clicked", this.handle_exit_button_clicked.bind(this), true);
        this.classList.add('hide-element');
    }

    handle_exit_button_clicked() {
        if (this.exit_warning_element === undefined) {
            this.classList.add('show-element-grid');
            this.exit_warning_element = document.createElement("div");
            this.exit_warning_element.innerHTML = `
        <div id="l2-exit-warning-container">
        <div id="l2-exit-warning-text">Are you sure you want to Logout?</div>
        <input id="l2-exit-confirm-button" type="button" value="Yes Exit">
        <input id="l2-exit-cancel-button" type="button" value="Cancel">
        </div>`
            this.appendChild(this.exit_warning_element);
            this.querySelector("#l2-exit-cancel-button").addEventListener("pointerdown", event => this.handle_exit_cancel_button_clicked());
            this.querySelector("#l2-exit-confirm-button").addEventListener("pointerdown", event => this.handle_exit_confirm_button_clicked());
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
        this.classList.remove('show-element-grid');
        this.exit_confirm = "false";
        this.exit_warning_element.remove();
        this.exit_warning_element = undefined;
    }

}
customElements.define("l2-exit-confirm", l2_exit_confirm)