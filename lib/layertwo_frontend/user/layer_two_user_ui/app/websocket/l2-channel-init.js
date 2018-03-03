export class l2_channel_init extends HTMLElement {
    constructor(){
        super();
    }

    channel_init_on() {
        this.channel_init.on("entity_basic_info_version_request", connection_state => this.send_current_basic_info_version());
        this.channel_init.on("entity_basic_info_version_check", info_version_state => this.check_basic_info(info_version_state));
        this.channel_init.on("update_entity_basic_info", basic_info_db_data => this.update_basic_info(basic_info_db_data));
    }

    send_current_basic_info_version() {
        if (sessionStorage.getItem("entity_basic_info_version") === null) {
            this.channel_init.push("entity_basic_info_version", { "current_version": "false" }, 10000);
        } else {
            this.channel_init.push("entity_basic_info_version", { "current_version": sessionStorage.getItem("entity_basic_info_version") }, 10000);
        }
    }

    check_basic_info(info_version_state) {
        if (info_version_state.info_version === "outdated") {
            this.channel_init.push("update_entity_basic_info_request", {}, 10000);
        } else {
            console.log("Entity Basic Info is Current.");
            this.l2_init_join_all_channels();
        }

    }

    update_basic_info(basic_info_db_data) {
        if (basic_info_db_data.error === "false") {
            sessionStorage.setItem("entity_basic_info_version", basic_info_db_data.entity_basic_info_version);
            sessionStorage.setItem("entity_name", basic_info_db_data.entity_name);
            sessionStorage.setItem("entity_latitude", basic_info_db_data.entity_latitude);
            sessionStorage.setItem("entity_longitude", basic_info_db_data.entity_longitude);
            sessionStorage.setItem("city_latitude", basic_info_db_data.city_latitude);
            sessionStorage.setItem("city_longitude", basic_info_db_data.city_longitude);
            sessionStorage.setItem("country_latitude", basic_info_db_data.country_latitude);
            sessionStorage.setItem("country_longitude", basic_info_db_data.country_longitude);
            sessionStorage.setItem("city_ws_uuid", basic_info_db_data.city_ws_uuid);
            sessionStorage.setItem("country_ws_uuid", basic_info_db_data.country_ws_uuid);
            this.dispatchEvent(new CustomEvent("l2-basic-info-update", { bubble: true, composed: true }));
            this.l2_init_join_all_channels();
        } else {
            console.log(basic_info_db_data.error);
        }
    }
}