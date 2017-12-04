import { l2_init_websocket } from "./l2-init-websocket.js"

export class l2_local_websocket extends l2_init_websocket {

    constructor() {
        super();
        this.channel_name = "l2_user:local";
    }

    channel_on(){
        this.channel.on("local_msg", payload => console.log("Ping Local"));
    }

}

customElements.define("l2-local-websocket", l2_local_websocket)