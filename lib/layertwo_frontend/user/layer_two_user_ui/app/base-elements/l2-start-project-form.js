

export class l2_start_project_form extends HTMLElement {
    constructor() {
        super();
        this.add_mbox_listener();
        document.addEventListener('ws-request-failed', this.handle_ws_request_failed.bind(this), true);
        document.addEventListener('l2-nav-button-clicked', this.handle_clicked_event.bind(this), true);
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');
        this.view_name = this.getAttribute('view');
        this.form_display = this.getAttribute('display');
        this.solution_elements_list = new Array();
        this.solution_steps_list = new Array();
        this.cancel_button_handler = this.cancel_button.bind(this);
    }

    add_mbox_listener() {
        document.addEventListener('start-project-mbox', this.handle_mbox_message.bind(this), true);
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initial_state();
        this.querySelector('#project-cancel-button').addEventListener("pointerdown", this.cancel_button_handler);
        this.querySelector("#project-submit-form").addEventListener("submit", event => this.handle_submit_button_clicked(event));
        this.querySelector("#add-solution-button").addEventListener("pointerdown", event => this.handle_add_solution_clicked());
        this.solutions_list = this.querySelector("#solutions-list");
        create_solution_element();
    }


    cancel_button(){
        this.dispatchEvent(new CustomEvent("view-nav-mbox", {
            detail: {
                section: this.section,
                sub_section: this.sub_section,
                action: 'reset-default-view'
            },
            bubble: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent("button-mbox", {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`,
                action: 'hide-button'
            },
            bubble: true, composed: true
        }));
    }

    initial_state() {
        if (sessionStorage.getItem(`l2-${this.section}-${this.sub_section}-nav`) === this.view_name
            && this.form_display !== 'false') {
            this.state_show();
        } else if (this.form_display === 'false') {
            this.dispatchEvent(new CustomEvent("view-nav-mbox", {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    action: 'reset-default-view'
                },
                bubble: true, composed: true
            }));
        } else {
            this.state_hide();
        }
    }

    handle_mbox_message(event) {
        if (event.detail.section === this.section) {
            this.process_mbox_message(event);
        }
    }


    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'start-project':
                this.handle_start_project_event(event);
                break;
            case 'entry-rejected':
                this.handle_submit_failed('Entry Rejected.');
                break;
            case 'entry-accepted':
                this.handle_submit_success_constructor();
                break;
        }
    }

    handle_start_project_event(event) {
        document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`
            }, bubble: true, composed: true
        }));
        document.dispatchEvent(new CustomEvent('button-mbox', {
            detail: {
                button_name: this.view_name,
                button_section: `${this.section}-${this.sub_section}`,
                action: 'show-button'
            }, bubble: true, composed: true
        }));
        document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', {
            detail: {
                button_name: this.sub_section,
                button_section: this.section
            }, bubble: true, composed: true
        }));

        this.populate_project_data(event);
    }

    populate_project_data(event) {
        this.solution_elements_list = new Array();
        this.solution_steps_list = new Array();
        this.querySelector("#solutions-list").innerHTML = "";

        let association_container = this.querySelector("#associated-with-container");
       
        association_container.innerHTML = "";
        association_container.appendChild(this.create_associated_element(event));

    }

    create_associated_element(event) {
        let element = document.createElement("l2-list-element");
        element.setAttribute("element-uuid", event.detail.element_uuid);
        element.setAttribute("element-title", event.detail.element_title);
        element.setAttribute("element-description", event.detail.element_description);
        element.setAttribute("element-importance", event.detail.element_importance);
        element.setAttribute("element-latitude", event.detail.element_latitude);
        element.setAttribute("element-longitude", event.detail.element_longitude);
        element.setAttribute("element-timestamp", event.detail.element_timestamp);
        element.setAttribute("element-photo",event.detail.element_photo);
        element.setAttribute("element-section", this.section);
        element.setAttribute("element-sub-section", this.sub_section);
        element.setAttribute("element-view-name", this.view_name);
        return element;
    }

    handle_add_solution_clicked() {
        this.solutions_list.appendChild(this.create_solution_element());
    }

    create_solution_element() {
        let solution_form = document.createElement("form");
        let delete_solution = document.createElement("input");
        let add_step_button = document.createElement("input");

        let element_id = Math.floor(Math.random() * 1000000000000);
        this.solution_elements_list.push(element_id);
        this.solution_steps_list.push({ [element_id]: [] });

        delete_solution.setAttribute('type', "button");
        delete_solution.setAttribute('value', "Remove Solution");
        delete_solution.setAttribute('class', "project-delete-solution-button");
        delete_solution.addEventListener('pointerdown', event => this.remove_solution(solution_form, element_id));


        add_step_button.setAttribute('type', "button");
        add_step_button.setAttribute('value', "Add Step");
        add_step_button.setAttribute('class', "project-solution-add-step-button");
        add_step_button.addEventListener('pointerdown', event => this.add_step(element_id));


        solution_form.setAttribute("class", "project-solution-element");
        solution_form.setAttribute("id", "start-project-form");
        solution_form.innerHTML = `
        ${this.html_solution_title(element_id)}
        ${this.html_request_authorities_assistance(element_id)}
        <div id="solution-steps-heading" class="project-solution-steps-heading">Solution Steps</div>
        <div id="solution-steps-list-${element_id}" class="project-solution-steps-list">
        </div>`;
        solution_form.appendChild(add_step_button);
        solution_form.appendChild(delete_solution);
        return solution_form;
    }

    add_step(element_id) {
        let steps_main = document.createElement('div');
        let step_title_heading = document.createElement('div');
        let step_description_heading = document.createElement('div');
        let step_title_input = document.createElement("input");
        let step_description_input = document.createElement("textarea");
        let remove_step = document.createElement("input");

        let step_id = Math.floor(Math.random() * 1000000000000);

        this.solution_steps_list.forEach(function (item, index, array) {
            if (element_id in item) {
                item[element_id].push(step_id);
            }
        }, this);


        step_title_heading.setAttribute("class", "project-add-step-title-heading");
        step_title_heading.innerHTML = "Step name: ";

        step_description_heading.setAttribute("class", "project-add-step-description-heading");
        step_description_heading.innerHTML = "Step description: ";

        step_title_input.setAttribute("type","text");
        step_title_input.setAttribute("class","project-add-step-text");
        step_title_input.setAttribute("form","project-submit-form");
        step_title_input.setAttribute("id",`step-title-id-${step_id}`);
        step_title_input.required = true;
        
        step_description_input.setAttribute("cols","5");
        step_description_input.setAttribute("rows","5");
        step_description_input.setAttribute("class","project-add-step-textarea");
        step_description_input.setAttribute("form","project-submit-form");
        step_description_input.setAttribute("id",`step-description-id-${step_id}`);
        step_description_input.required = true;

        steps_main.setAttribute("class", "steps-main-element");

        steps_main.appendChild(step_title_heading);
        steps_main.appendChild(step_description_heading);
        steps_main.appendChild(step_title_input);
        steps_main.appendChild(step_description_input);
        steps_main.appendChild(remove_step);

        remove_step.setAttribute('type', "button");
        remove_step.setAttribute('value', "Remove Step");
        remove_step.setAttribute('class', "project-add-step-remove-button");
        remove_step.addEventListener('pointerdown', event => this.remove_step(steps_main, element_id, step_id));

        this.querySelector(`#solution-steps-list-${element_id}`).appendChild(steps_main);
    }

    remove_solution(element, element_id) {
        this.solution_elements_list.forEach(function (item, index, array) {
            if (item === element_id) {
                this.solution_elements_list.splice(index, 1);
            }
        }, this);

        let index = this.solution_steps_list.length - 1;
        while (index >= 0) {
            if (element_id in this.solution_steps_list[index]) {
                this.solution_steps_list.splice(index, 1);
            }

            index -= 1;
        }
        element.remove();
    }

    remove_step(steps_main, element_id, step_id) {
        this.solution_steps_list.forEach(function (item, index, array) {
            if (element_id in item) {
                let index = item[element_id].length - 1;
                while (index >= 0) {
                    if (step_id === item[element_id][index]) {
                        item[element_id].splice(index, 1);
                    }

                    index -= 1;
                }
            }
        }, this);

        steps_main.remove();
    }

    handle_submit_button_clicked(event) {
        event.preventDefault();
        this.querySelector("#submit-button").disabled = true;
        this.submit();
    }

    submit() {
        this.title_input = this.querySelector("#title-input").value;
        this.description_input = this.querySelector("#description-input").value;
        this.dispatchEvent(new CustomEvent("ws-channel-mbox", {
            detail: {
                section: this.section,
                sub_section: this.sub_section,
                view_name: this.view_name,
                action: 'start-project'
            },
            bubble: true, composed: true
        }));
    }

    handle_ws_request_failed(event) {
        if (event.detail.event.detail.view_name === this.view_name
            && event.detail.event.detail.section === this.section
            && this.sub_section === this.sub_section) {
            this.handle_submit_failed_constructor('Request Failed.');
        }
    }

    handle_submit_success_constructor() {
        this.submit_success();
    }

    submit_success() {
        this.querySelector("#submit-button").disabled = false;

        this.submit_success_element = document.createElement("div");
        this.submit_success_element.setAttribute("id", "submit-success-text");
        this.submit_success_element.setAttribute("class", "submit-form-submit-success-text");
        this.submit_success_element.innerHTML = 'Entry Accepted';
        if (this.entry_result === undefined) {
            this.querySelector("#submit-result").appendChild(this.submit_success_element);
            this.entry_result = "accepted";
        } else if (this.entry_result === "failed") {
            this.querySelector("#submit-failed-text").remove();
            this.querySelector("#submit-result").appendChild(this.submit_success_element);
            this.entry_result = "accepted";
        }
    }

    handle_submit_failed_constructor(reason) {
        this.handle_submit_failed(reason);
    }

    handle_submit_failed(reason) {
        this.querySelector("#submit-button").disabled = false;

        this.submit_failed_element = document.createElement("div");
        this.submit_failed_element.setAttribute("id", "submit-failed-text");
        this.submit_failed_element.setAttribute('class', 'submit-form-submit-failed-text');
        this.submit_failed_element.innerHTML = reason;
        if (this.entry_result === undefined) {
            this.querySelector("#submit-result").appendChild(this.submit_failed_element);
            this.entry_result = "failed";
        } else if (this.entry_result === 'failed'
            && this.querySelector("#submit-failed-text").innerHTML !== reason) {
            this.querySelector("#submit-failed-text").innerHTML = reason;
        } else if (this.entry_result === "accepted") {
            this.querySelector("#submit-success-text").remove();
            this.querySelector("#submit-result").appendChild(this.submit_failed_element);
            this.entry_result = "failed";
        }
    }

    handle_clicked_event(event) {
        if (event.detail.button_name === this.view_name
            && event.detail.button_section === `${this.section}-${this.sub_section}`) {
            this.state_show();
        } else if (event.detail.button_name !== this.view_name
            && event.detail.button_section === `${this.section}-${this.sub_section}`) {
            this.state_hide();
        }
    }

    state_show() {
        this.classList.remove('hide-element');
        this.classList.add('show-element-grid');
    }

    state_hide() {
        this.classList.remove('show-element-grid');
        this.classList.add('hide-element');
    }

    template() {
        return `
        ${this.html_constructor()}`;
    }

    html_constructor() {
        return `
        ${this.html_form_heading()}
        <form id="project-submit-form" class="start-project-submit-form">
        <div id="form-container" class="project-submit-form-container">
        <div id="project-details" class="start-project-project-details">
        ${this.html_associated_with()}
        ${this.html_associated_with_container()}
        <div id="leaflet-map-container">
        <l2-leaflet-map section='${this.section}' sub-section='${this.sub_section}' view='${this.view_name}'></l2-leaflet-map>
        </div>
        </div>
        </div>
        <div id="project-solutions-container" class="start-project-solutions-container">     
        ${this.html_add_solution_button()}
        <div id="add-solution-container" class="project-add-solution-container">
        <div id="add-solution" class="project-add-solution">
        <div id="solutions-list" class="project-solutions-list">
        </div>
        </div>
        </div>
        </div>
        <div id="cancel-submit-buttons-container" class="project-cancel-submit-buttons-container">
        ${this.html_submit_button()}
        ${this.html_cancel_button()}
        ${this.html_submit_result()}
        </div>
        </form>
        `;
    }

    html_form_heading() {
        return `
        <div id="submit-form-heading" class='project-submit-form-heading'>${this.view_name}</div>
        `;
    }

    html_associated_with() {
        return `
        <div id="associated-with" class='submit-form-associated-with'>Association</div>
        `;
    }

    html_associated_with_container() {
        return `
        <div id="associated-with-container" class='submit-form-associated-with-container'>Project is not associated.</div>
        `;
    }

    html_submit_button() {
        return `
        <input id="submit-button" class='project-submit-form-submit-button' value="Submit" type="submit"/>
        `;
    }

    html_cancel_button() {
        return `
        <input id="project-cancel-button" class='project-submit-form-cancel-button' value="Cancel" type="button"/>
        `;
    }

    html_submit_result() {
        return `
        <div id="submit-result" class='submit-form-submit-result'></div>
        `;
    }

    html_request_authorities_assistance(element_id) {
        return `
        <div class="project-request-authorities-assistance">Assistance from Authorities:<div>
         <input type="radio" id="assistance-from-authorities-no-${element_id}" name="authorities-assistance-radio-${element_id}" value="no" checked>
         <label for="assistance-from-authorities-no-${element_id}">No</label>
        </div>
        <div>
         <input type="radio" id="assistance-from-authorities-yes-${element_id}" name="authorities-assistance-radio-${element_id}" value="yes">
         <label for="assistance-from-authorities-yes-${element_id}">Yes</label>
        </div>
        </div>
        `;
    }

    html_solution_title(element_id) {
        return `<div>Solution Title: <input id="solution-title-input-${element_id}" form="project-submit-form" class="solution-title-input" type="text" required></div>
        `;
    }

    html_add_solution_button() {
        return `
        <input id="add-solution-button" class='project-add-solution-button' value="Add Solution" type="button"/>
        `;
    }
}

customElements.define('l2-start-project-form', l2_start_project_form)