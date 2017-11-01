import { Socket } from "phoenix"

export class l2_basic_ws extends HTMLElement {
    constructor() {
        super();
        this.user_token = this.get_user_token();
        this.socket = new Socket("/socket", { params: { user_token: this.user_token } });
    }

    connectedCallback() {
        this.connect_to_ws();
    }

    get_user_token() {
        if (document.getElementsByName("user_token")[0]) {
            return document.getElementsByName("user_token")[0].getAttribute("content")
        } else {
            return "none";
        }
    }

    connect_to_ws() {
        if (this.user_token !== "none") {
            this.socket.connect();
        }
    }
}

customElements.define("l2-basic-ws", l2_basic_ws)