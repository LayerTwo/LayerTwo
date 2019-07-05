import { l2_channel_social } from "./l2-channel-social.js";

export class l2_channel_city_local extends l2_channel_social {
    constructor() {
        super();
        this.city_local_problems_list_request = "false";
        document.addEventListener('ws-channel-mbox', this.channel_city_local_handle_mbox_message.bind(this), true);
        document.addEventListener("element-description-request", this.handle_element_description_request.bind(this), true);
        document.addEventListener("element-delete-request", this.handle_element_delete_request.bind(this), true);
    }

    channel_city_local_handle_mbox_message(event) {
        if (event.detail.section === 'Local') {
            this.channel_city_local_process_mbox_message(event);
        }
    }

    channel_city_local_process_mbox_message(event) {
        if (this.channel_city_local !== undefined
            && this.channel_city_local.state === "joined") {
            switch (event.detail.action) {
                case 'submit-form':
                    this.channel_city_local_process_submit_form(event);
                    break;
                case 'start-project':
                    this.handle_start_project_event(event);
                    break;
                case 'update-form':
                    this.channel_city_local_process_update_form(event);
                    break;
                case 'list-request':
                    this.handle_list_request_event(event);
                    break;
            }
        } else {
            document.dispatchEvent(new CustomEvent('ws-request-failed', { detail: { event: event }, bubble: true, composed: true }));
        }
    }

    channel_city_local_process_submit_form(event) {
        switch (event.detail.view_name) {
            case 'Submit Problem':
                this.channel_city_local_process_submit_problem(event);
                break;
        }
    }

    channel_city_local_process_update_form(event) {
        switch (event.detail.view_name) {
            case 'Edit Problem':
                this.channel_city_local_process_update_problem(event);
                break;
        }
    }

    handle_element_delete_request(event) {
        if (event.detail.element_section === 'Local'
            && event.detail.element_sub_section === 'Problems') {
            this.channel_city_local.push("delete-local-problem", { local_problem_uuid: event.detail.element_uuid }, 10000);
        }
    }

    handle_list_request_event(event) {
        switch (event.detail.view_name) {
            case 'List Problems':
                if (this.channel_city_local === undefined) {
                    this.city_local_problems_list_request = "true";
                } else if (this.channel_city_local.state === "joined"
                    && this.city_local_problems_list_request_sent !== 'true') {
                    this.city_local_problems_list_request = "true";
                    this.channel_city_local_problems_list_request();
                } else {
                    this.city_local_problems_list_request = "true";
                }
                break;
            case 'List Goals':
                if (this.channel_city_local === undefined) {
                    this.city_local_goals_list_request = "true";
                } else if (this.channel_city_local.state === "joined"
                    && this.city_local_goals_list_request_sent !== 'true') {
                    this.city_local_goals_list_request = "true";
                    this.channel_city_local_goals_list_request();
                } else {
                    this.city_local_goals_list_request = "true";
                }
                break;
            case 'Authorities Announcements':
                break;
            case 'List Projects':
                break;
            case 'Business Offers':
                break;
            case 'List Events':
                break;
        }
    }

    handle_element_description_request(event) {
        if (event.detail.element_section === 'Local') {

            this.channel_city_local.push("city-local-problem-description-request", { local_problem_uuid: event.detail.element_uuid }, 10000);
        }
    }

    channel_city_local_problems_list_request() {
        this.channel_city_local.push("l2-city-local-problems-list-request", {}, 10000).receive("ok", event => this.city_local_problems_list_request_sent = 'true');
    }

    handle_start_project_event(event) {
        this.channel_city_local.push("l2-city-local-start-project", { solutions_and_steps: event.detail.solutions_package, associated_element: event.detail.associated_element }, 10000).receive("ok", event => this.city_local_start_project = 'true');
    }

    channel_city_local_goals_list_request() {
        this.channel_city_local.push("l2-city-local-goals-list-request", {}, 10000).receive("ok", event => this.city_local_goals_list_request_sent = 'true');
    }

    channel_city_local_process_submit_problem(event) {
        this.channel_city_local.push("l2-city-local-problem-form-data-submit", {
            problem_title: event.detail.form_title,
            problem_importance: event.detail.importance_level,
            problem_description: event.detail.form_description,
            problem_photo: event.detail.form_photo,
            problem_latitude: event.detail.latitude,
            problem_longitude: event.detail.longitude
        }, 10000);
    }

    channel_city_local_process_update_problem(event) {
        this.channel_city_local.push("l2-city-local-problem-update-form-data-submit", {
            problem_uuid: event.detail.entry_uuid,
            problem_title: event.detail.form_title,
            problem_importance: event.detail.importance_level,
            problem_description: event.detail.form_description,
            problem_photo: event.detail.form_photo,
            problem_latitude: event.detail.latitude,
            problem_longitude: event.detail.longitude
        }, 10000);
    }

    channel_city_local_on() {
        this.channel_city_local.on("l2-city-local-problems-list-db", data => this.channel_city_local_handle_problems_list_db(data));
        this.channel_city_local.on("l2-city-local-problem-description-db", data => this.channel_city_local_handle_local_problem_description(data));
        this.channel_city_local.on("l2-city-local-update-problems-list", data => this.channel_city_local_handle_update_problems_list(data));
        this.channel_city_local.on("delete-element", event => this.channel_city_local_delete_element(event));
        this.channel_city_local.on("l2-city-local-problem-submission-success", data => this.channel_city_local_handle_local_problem_submission_success());
        this.channel_city_local.on("l2-city-local-problem-submission-failed", data => this.channel_city_local_handle_local_problem_submission_failed());
        this.channel_city_local.on("l2-city-local-problem-update-success", data => this.channel_city_local_handle_local_problem_update_success());
        this.channel_city_local.on("l2-city-local-problem-update-failed", data => this.channel_city_local_handle_local_problem_update_failed());
        this.channel_city_local.on("l2-city-local-update-local-problem", event => this.channel_city_local_handle_update_local_problem(event));
    }

    channel_city_local_handle_update_local_problem(event) {
        this.dispatchEvent(new CustomEvent("list-element-mbox", { detail: { element_uuid: event.element_uuid, event: event, action: 'update-element' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_local_problem_submission_success() {
        this.dispatchEvent(new CustomEvent("submit-form-mbox", { detail: { section: 'Local', sub_section: 'Problems', view_name: 'Submit Problem', action: 'entry-accepted' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_local_problem_submission_failed() {
        this.dispatchEvent(new CustomEvent("submit-form-mbox", { detail: { section: 'Local', sub_section: 'Problems', view_name: 'Submit Problem', action: 'entry-rejected' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_local_problem_update_success() {
        this.dispatchEvent(new CustomEvent("edit-form-mbox", { detail: { section: 'Local', sub_section: 'Problems', view_name: 'Edit Problem', action: 'update-accepted' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_local_problem_update_failed() {
        this.dispatchEvent(new CustomEvent("edit-form-mbox", { detail: { section: 'Local', sub_section: 'Problems', view_name: 'Edit Problem', action: 'update-failed' }, bubble: true, composed: true }));
    }

    channel_city_local_delete_element(event) {
        this.dispatchEvent(new CustomEvent("list-element-mbox", { detail: { element_uuid: event.element_uuid, action: 'delete-element' }, bubble: true, composed: true }));
        this.dispatchEvent(new CustomEvent("list-count-mbox", { detail: { view_name: 'List Problems', section: 'Local', sub_section: 'Problems', action: 'reduce-by-one' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_problems_list_db(data) {
        this.dispatchEvent(new CustomEvent("list-container-mbox", { detail: { list_container_name: 'List Problems', list_container_section: 'Local-Problems', action: 'create-list', list: data.local_problems_list }, bubble: true, composed: true }));
        this.dispatchEvent(new CustomEvent("list-count-mbox", { detail: { view_name: 'List Problems', section: 'Local', sub_section: 'Problems', action: 'show-count', list: data.local_problems_list }, bubble: true, composed: true }));
    }

    channel_city_local_handle_local_problem_description(data) {
        this.dispatchEvent(new CustomEvent("list-element-mbox", { detail: { element_uuid: data.local_problem_uuid, element_description: data.local_problem_description, element_photo: data.local_problem_photo, action: 'update-description' }, bubble: true, composed: true }));
    }

    channel_city_local_handle_update_problems_list(data) {
        this.channel_city_local_problems_list_request();
    }

}
