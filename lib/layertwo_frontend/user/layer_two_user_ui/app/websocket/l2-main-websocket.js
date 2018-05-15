import { Socket } from "phoenix"
import { l2_channel_visit } from "./l2-channel-visit.js";

export class l2_main_websocket extends l2_channel_visit {
    constructor(){
        super();
        this.entity_token = this.get_entity_token();
        this.entity_ws_uuid = this.get_entity_ws_uuid();
        this.socket = new Socket("/socket", { params: { entity_token: this.entity_token}});
        this.channel_init_name = `l2_init:${this.entity_ws_uuid}`;
    }

    get_entity_token() {
        if (document.getElementsByName("entity_token")[0]) {
            return document.getElementsByName("entity_token")[0].getAttribute("content")
        } else {
            return "none";
        }
    }

    get_entity_ws_uuid() {
        if (document.getElementsByName("entity_ws_uuid")[0]) {
            return document.getElementsByName("entity_ws_uuid")[0].getAttribute("content")
        } else {
            return "none";
        }
    }

    connect_to_socket() {
        if (this.entity_token !== "none") {
            this.socket.connect();
        }
    }

    connectedCallback() {
        this.connect_to_socket();
        this.join_channel_init();
    }

    l2_init_join_all_channels(){
        if(this.channel_personal === undefined && 
           this.channel_social === undefined &&
           this.channel_city_local === undefined &&
           this.channel_city === undefined &&
           this.channel_country === undefined &&
           this.channel_world === undefined &&
           this.channel_space === undefined &&
           this.channel_visit === undefined ){
        this.join_channel_personal();
        this.join_channel_social();
        this.join_channel_city_local();
        this.join_channel_city();
        this.join_channel_country();
        this.join_channel_world();
        this.join_channel_space();
        this.join_channel_visit();
        }
    }

    join_channel_init(){
        this.channel_init = this.socket.channel(this.channel_init_name, {});
        this.channel_init.join().receive("ok", resp => {this.channel_init.push(`connected_to_l2_init`), console.log("Joined l2_init successfully!");});
        this.channel_init_on();
    }

    join_channel_personal(){
        this.channel_personal_name = `l2_personal:${this.entity_ws_uuid}`;
        this.channel_personal = this.socket.channel(this.channel_personal_name,{});
        this.channel_personal.join().receive("ok", resp => { this.channel_ready('Personal'); console.log("Joined l2_personal successfully!");});  
    }

    join_channel_social(){
        this.channel_social_name = `l2_social:${this.entity_ws_uuid}`;
        this.channel_social = this.socket.channel(this.channel_social_name,{});
        this.channel_social.join().receive("ok", resp => { this.channel_ready('Social'); console.log("Joined l2_social successfully!");});
    }

    join_channel_city_local(){
        this.channel_city_local_name = `l2_city_local:${this.entity_ws_uuid}`;
        this.channel_city_local = this.socket.channel(this.channel_city_local_name,{});
        this.channel_city_local.join().receive("ok", resp => { this.channel_ready('Local'); console.log("Joined l2_city_local successfully!");});
        this.channel_city_local_on();
    }

    join_channel_city(){
        this.channel_city_name = `l2_city:${sessionStorage.getItem("city_ws_uuid")}`;
        this.channel_city = this.socket.channel(this.channel_city_name,{});
        this.channel_city.join().receive("ok", resp => { this.channel_ready('City'); console.log("Joined l2_city successfully!");});
    }

    join_channel_country(){
        this.channel_country_name = `l2_country:${sessionStorage.getItem("country_ws_uuid")}`;
        this.channel_country = this.socket.channel(this.channel_country_name,{});
        this.channel_country.join().receive("ok", resp => { this.channel_ready('Country'); console.log("Joined l2_country successfully!");});
    }

    join_channel_world(){
        this.channel_world_name = `l2_world:${this.entity_ws_uuid}`;
        this.channel_world = this.socket.channel(this.channel_world_name,{});
        this.channel_world.join().receive("ok", resp => { this.channel_ready('World'); console.log("Joined l2_world successfully!");});
    
    }

    join_channel_space(){
        this.channel_space_name = `l2_space:${this.entity_ws_uuid}`;
        this.channel_space = this.socket.channel(this.channel_space_name,{});
        this.channel_space.join().receive("ok", resp => { this.channel_ready('Space'); console.log("Joined l2_space successfully!");});
    }

    join_channel_visit(){
        this.channel_visit_name = `l2_visit:${this.entity_ws_uuid}`;
        this.channel_visit = this.socket.channel(this.channel_visit_name,{});
        this.channel_visit.join().receive("ok", resp => { this.channel_ready('Visit'); console.log("Joined l2_visit successfully!");});
    }

    channel_ready(name){
        this.dispatchEvent(new CustomEvent('channel-ready', {detail:{channel: name}, bubble: true, composed: true }));
    }

}

customElements.define("l2-main-websocket", l2_main_websocket)