import { l2_channel_social } from "./l2-channel-social.js";

export class l2_channel_city_local extends l2_channel_social {
    constructor(){
        super();
        this.city_local_problems_data_request = "false";
        document.addEventListener("l2-city-local-problem-form-data-submit", this.send_city_local_problem_form_data.bind(this), true);
        document.addEventListener("l2-local-list-problems-display-data-request", this.handle_city_local_problems_data_request_event.bind(this), true);
        document.addEventListener("l2-local-problem-element-description-request", this.handle_city_local_problem_description_request_event.bind(this), true);
    }

    handle_city_local_problems_data_request_event(){
        if(this.channel_city_local === undefined){
            this.city_local_problems_data_request = "true"; 
        } else if(this.channel_city_local.state === "joined"){
            this.city_local_problems_data_request = "true";
        this.channel_city_local_init_process();
        } else {
            this.city_local_problems_data_request = "true";
        }
    }

    handle_city_local_problem_description_request_event(data){
        this.channel_city_local.push("city-local-problem-description-request", {local_problem_uuid: data.detail.local_problem_uuid}, 10000);
    }

    channel_city_local_init_process(){
        if(this.city_local_problems_data_request === "true"){
            this.channel_city_local_problems_data_request();
        }
    }

    channel_city_local_problems_data_request(){
        this.channel_city_local.push("l2-city-local-list-problems-init-data-request", {}, 10000);
    }

    send_city_local_problem_form_data(data) {
        this.channel_city_local.push("l2_city_local_problem_form_data_submit", { problem_title: data.detail.problem_title,
                                                                                 problem_importance: data.detail.problem_importance, 
                                                                                 problem_description: data.detail.problem_description, 
                                                                                 problem_latitude: data.detail.problem_latitude, 
                                                                                 problem_longitude: data.detail.problem_longitude }, 10000)
            .receive("ok", (msg) => console.log("Local Problem Submission Accepted", msg))
            .receive("error", (reasons) => console.log("Local Problem Submission Failed.", reasons))
            .receive("timeout", () => console.log("Local Problem Submission was not received, timed out."));
    }

    channel_city_local_on() {
        this.channel_city_local.on("l2-city-local-problems-init-list", data => this.channel_city_local_handle_init_problems_list(data));
        this.channel_city_local.on("l2-city-local-db-problem-description", data => this.channel_city_local_handle_local_problem_description(data));
        this.channel_city_local.on("l2-city-local-update-problems-list", data => this.channel_city_local_handle_update_problems_list(data));
    }

    channel_city_local_handle_init_problems_list(data){
        this.dispatchEvent(new CustomEvent("l2-city-local-init-problems-list", {detail: {local_problems_init_list: data.local_problems_init_list}, bubble: true, composed: true}));
    }

    channel_city_local_handle_local_problem_description(data){
        this.dispatchEvent(new CustomEvent("l2-city-local-problem-description-update", {detail: {local_problem_uuid: data.local_problem_uuid, local_problem_description: data.local_problem_description}, bubble: true, composed: true}));
    }

    channel_city_local_handle_update_problems_list(data){
        this.channel_city_local_problems_data_request();
    }

}