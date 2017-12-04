import { Socket } from "phoenix"

export class l2_init_websocket extends HTMLElement {
    constructor() {
        super();
        this.channel_name = "l2_init:main";
        this.entity_token = this.get_entity_token();
        this.socket = new Socket("/socket", { params: { entity_token: this.entity_token } });
    }

    connectedCallback() {
        this.connect_to_ws();
        this.join_channel();
        this.channel_on();
    }

    join_channel(){
        this.channel = this.socket.channel(this.channel_name, {});
        this.channel.join().receive("ok", resp => { console.log("Joined successfully", resp) });
    }

    channel_on(){
        this.channel.on("init_msg", payload => console.log("Ping Init"));
    }

    get_entity_token() {
        if (document.getElementsByName("entity_token")[0]) {
            return document.getElementsByName("entity_token")[0].getAttribute("content")
        } else {
            return "none";
        }
    }

    connect_to_ws() {
        if (this.entity_token !== "none") {
            this.socket.connect();
        }
    }
}

customElements.define("l2-init-websocket", l2_init_websocket)