export class l2_list_element extends HTMLElement {
    constructor() {
        super();
        document.addEventListener(`list-element-mbox`, this.handle_mbox_message.bind(this), true);
    }

    handle_mbox_message(event) {
        if (event.detail.element_uuid === this.element_uuid) {
            this.process_mbox_message(event);
        }
    }

    connectedCallback() {
        this.section = this.getAttribute('element-section');
        this.sub_section = this.getAttribute('element-sub-section');
        this.view_name = this.getAttribute('element-view-name');
        this.element_uuid = this.getAttribute('element-uuid');
        this.element_title = this.getAttribute('element-title');
        this.element_importance = parseInt(this.getAttribute('element-importance'));
        this.element_latitude = this.getAttribute('element-latitude');
        this.element_longitude = this.getAttribute('element-longitude');
        this.publish_date = new Date(parseInt(this.getAttribute('element-timestamp')));
        this.innerHTML = this.template();
        this.importance_indicator = this.querySelector('#importance-color-indicator');
        this.importance_indicator.classList.add('list-element-importance-color-indicator');
        this.querySelector('#details-container').classList.add('list-element-details-container');
        this.edit_button = this.querySelector('#edit-button');
        this.edit_button.classList.add('list-element-edit-button');
        this.edit_button.addEventListener('pointerdown', event => this.edit_button_clicked());
        this.delete_button = this.querySelector('#delete-button');
        this.delete_button.classList.add('list-element-delete-button');
        this.delete_button.addEventListener('pointerdown', event => this.delete_button_clicked());
        this.start_project_button = this.querySelector('#start-project-button');
        this.start_project_button.classList.add('list-element-start-project-button');
        this.start_project_button.addEventListener('pointerdown', event => this.start_project_button_clicked());
        this.show_edit_button();
        this.show_delete_button();
        this.importance_level();
        this.hide_element_description();
        this.querySelector('#title-container').addEventListener('pointerdown', event => this.element_clicked());
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'select':
                this.handle_element_clicked();
                this.select_map_marker();
                break;
            case 'select-and-scroll':
                this.handle_element_clicked();
                this.select_map_marker();
                this.scroll_to_element();
                break;
            case 'update-description':
                this.handle_description_update(event);
                break;
            case 'delete-element':
                this.handle_delete_element();
                break;
            case 'update-element':
                this.handle_update_element_stage_1(event);
                break;
            case 'update-element-create-marker':
                this.handle_update_element_stage_2();
                break;
        }
    }

    element_clicked() {
        if (this.delete_dialog !== 'open') {
            this.dispatchEvent(new CustomEvent('list-element-mbox',
                {
                    detail: { element_uuid: this.element_uuid, action: 'select' },
                    bubble: true, composed: true
                }));
        }
    }

    handle_element_clicked() {
        if (this.element_description_status === undefined) {
            if (this.element_description === undefined) {
                this.dispatchEvent(new CustomEvent('element-description-request',
                    {
                        detail: {
                            element_uuid: this.element_uuid,
                            element_section: this.section,
                            element_sub_section: this.sub_section
                        },
                        bubble: true, composed: true
                    }));
            }
            this.show_element_description();
            this.element_description_status = 'showing';
        } else if (this.element_description_status === 'showing') {
            this.hide_element_description();

            this.element_description_status = 'hidden';
        } else {
            this.show_element_description();
            this.element_description_status = 'showing';
        }
    }

    handle_update_element_stage_1(event) {
        this.element_title = event.detail.event.element_title;
        this.element_importance = parseInt(event.detail.event.element_importance);
        this.element_description = event.detail.event.element_description;
        this.element_latitude = parseFloat(event.detail.event.element_latitude);
        this.element_longitude = parseFloat(event.detail.event.element_longitude);
        this.publish_date = new Date(parseInt(event.detail.event.element_timestamp));
        this.innerHTML = this.template();
        this.querySelector("#element-description").innerHTML = this.element_description;
        this.remove_map_marker();
        this.importance_indicator = this.querySelector('#importance-color-indicator');
        this.importance_indicator.classList.add('list-element-importance-color-indicator');
        this.querySelector('#details-container').classList.add('list-element-details-container');
        this.edit_button = this.querySelector('#edit-button');
        this.edit_button.classList.add('list-element-edit-button');
        this.edit_button.addEventListener('pointerdown', event => this.edit_button_clicked());
        this.delete_button = this.querySelector('#delete-button');
        this.delete_button.classList.add('list-element-delete-button');
        this.delete_button.addEventListener('pointerdown', event => this.delete_button_clicked());
        this.start_project_button = this.querySelector('#start-project-button');
        this.start_project_button.classList.add('list-element-start-project-button');
        this.querySelector('#title-container').addEventListener('pointerdown', event => this.element_clicked());
        this.importance_level();
        this.hide_element_description();
        this.element_description_status = 'hidden';
    }

    handle_update_element_stage_2(){
        this.create_map_marker();
        this.element_clicked();
        this.scroll_to_element();
    }

    handle_description_update(event) {
        if (event.detail.element_uuid === this.element_uuid) {
            this.element_description = event.detail.element_description;
            this.querySelector("#element-description").innerHTML = this.element_description;
        }
    }

    handle_delete_element() {
        this.remove_map_marker();
        this.dispatchEvent(new CustomEvent("list-count-mbox", {
            detail: {
                count_section: `${this.section}-${this.sub_section}`,
                count_view: this.view_name,
                action: 'subtract-one'
            },
            bubble: true, composed: true
        }));
        this.remove();
    }

    remove_map_marker(){
        this.dispatchEvent(new CustomEvent("leaflet-map-mbox", {
            detail: {
                element_uuid: this.element_uuid,
                map_section: `${this.section}-${this.sub_section}`,
                map_view: this.view_name,
                action: 'delete-marker'
            },
            bubble: true, composed: true
        }));
    }

    create_map_marker(){
        this.dispatchEvent(new CustomEvent("leaflet-map-mbox", {
            detail: {
                element_uuid: this.element_uuid,
                map_section: `${this.section}-${this.sub_section}`,
                map_view: this.view_name,
                element_latitude: this.element_latitude,
                element_longitude: this.element_longitude,
                element_title: this.element_title,
                action: 'create-marker'
            },
            bubble: true, composed: true
        }));
    }

    select_map_marker() {
        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
            {
                detail: {
                    element_uuid: this.element_uuid,
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'select-marker'
                },
                bubble: true, composed: true
            }));
    }



    scroll_to_element() {
        this.dispatchEvent(new CustomEvent('list-container-mbox',
            {
                detail: {
                    element_uuid: this.element_uuid,
                    list_container_section: `${this.section}-${this.sub_section}`,
                    list_container_name: this.view_name,
                    action: 'scroll-to-element'
                },
                bubble: true, composed: true
            }));
    }

    edit_button_clicked() {
        if (this.delete_warning_element === undefined) {
            this.dispatchEvent(new CustomEvent('edit-form-mbox', {
                detail: {
                    section: this.section,
                    sub_section: this.sub_section,
                    element_uuid: this.element_uuid,
                    element_title: this.element_title,
                    element_importance: this.element_importance,
                    element_description: this.element_description,
                    element_latitude: this.element_latitude,
                    element_longitude: this.element_longitude,
                    action: 'edit-entry'
                }, bubble: true, composed: true
            }));
        }
    }

    delete_button_clicked() {
        if (this.delete_warning_element === undefined) {
            this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
                {
                    detail: {
                        element_uuid: this.element_uuid,
                        map_section: `${this.section}-${this.sub_section}`,
                        map_view: this.view_name,
                        action: 'disable-marker'
                    },
                    bubble: true, composed: true
                }));
            this.delete_dialog = 'open';
            this.querySelector('#delete-button').disabled = true;
            this.querySelector('#edit-button').disabled = true;
            this.querySelector('#start-project-button').disabled = true;
            this.delete_warning_element = document.createElement('div');
            this.delete_warning_element.innerHTML = `
              <div class='delete-warning-container'>
              <div class='delete-warning-text'>Are you sure you want to delete this problem?</div>
              <input id='delete-confirm-button' class='l2-delete-confirm-button' type='button' value='Yes Delete'>
              <input id='delete-cancel-button' class='l2-delete-cancel-button' type='button' value='Cancel'>
              </div>`;
            this.querySelector('#element-container').appendChild(this.delete_warning_element);
            this.querySelector('#delete-cancel-button').addEventListener('pointerdown', event => this.delete_cancel_button_clicked());
            this.querySelector('#delete-confirm-button').addEventListener('pointerdown', event => this.delete_confirm_button_clicked());
        }
    }

    delete_cancel_button_clicked() {
        this.dispatchEvent(new CustomEvent('leaflet-map-mbox',
            {
                detail: {
                    element_uuid: this.element_uuid,
                    map_section: `${this.section}-${this.sub_section}`,
                    map_view: this.view_name,
                    action: 'enable-marker'
                },
                bubble: true, composed: true
            }));
        this.delete_warning_element.remove();
        this.delete_warning_element = undefined;
        this.delete_dialog = "closed";
        this.querySelector("#delete-button").disabled = false;
        this.querySelector("#edit-button").disabled = false;
        this.querySelector("#start-project-button").disabled = false;
    }

    delete_confirm_button_clicked() {
        this.querySelector("#delete-cancel-button").disabled = true;
        this.querySelector("#delete-confirm-button").disabled = true;
        this.dispatchEvent(new CustomEvent("element-delete-request", {
            detail: {
                element_uuid: this.element_uuid,
                element_section: this.section,
                element_sub_section: this.sub_section
            }, bubble: true, composed: true
        }));
    }

    start_project_button_clicked() {
        if (this.delete_warning_element === undefined) {
        }
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    hide_element_description() {
        this.querySelector('#details-container').classList.remove('show-element-grid');
        this.querySelector('#details-container').classList.add('hide-element');
        this.querySelector('#title-container').classList.remove('list-element-selected');
    }

    show_element_description() {
        this.querySelector('#details-container').classList.remove('hide-element');
        this.querySelector('#details-container').classList.add('show-element-grid');
        this.querySelector('#title-container').classList.add('list-element-selected');
    }

    show_edit_button() {
        if (this.getAttribute('element-author') === 'true') {
            this.querySelector('#edit-button').classList.remove('hide-element');
            this.querySelector('#edit-button').classList.add('show-element');
        } else {
            this.querySelector('#edit-button').classList.remove('show-element');
            this.querySelector('#edit-button').classList.add('hide-element');
        }
    }

    show_delete_button() {
        if (this.getAttribute('element-author') === 'true') {
            this.querySelector('#delete-button').classList.remove('hide-element');
            this.querySelector('#delete-button').classList.add('show-element');
        } else {
            this.querySelector('#delete-button').classList.remove('show-element');
            this.querySelector('#delete-button').classList.add('hide-element');
        }
    }

    importance_level() {
        switch (this.element_importance) {
            case 0:
                this.importance_indicator.classList.remove(this.importance_indicator_color_css);
                this.importance_indicator.classList.add('element_importance_0');
                this.importance_indicator_color_css = 'element_importance_0';
                break;
            case 1:
                this.importance_indicator.classList.remove(this.importance_indicator_color_css);
                this.importance_indicator.classList.add('element_importance_1');
                this.importance_indicator_color_css = 'element_importance_1';
                break;
            case 2:
                this.importance_indicator.classList.remove(this.importance_indicator_color_css);
                this.importance_indicator.classList.add('element_importance_2');
                this.importance_indicator_color_css = 'element_importance_2';
                break;
            case 3:
                this.importance_indicator.classList.remove(this.importance_indicator_color_css);
                this.importance_indicator.classList.add('element_importance_3');
                this.importance_indicator_color_css = 'element_importance_3';
                break;
            case 4:
                this.importance_indicator.classList.remove(this.importance_indicator_color_css);
                this.importance_indicator.classList.add('element_importance_4');
                this.importance_indicator_color_css = 'element_importance_4';
                break;
            default:
                console.log('Local Problem Importance Value Not Set!');
        }
    }

    html_constructor() {
        return `
        <div id='element-container' class='list-element-container'>
            <div id='title-container' class='list-element-title-container'>
                ${this.html_element_title()}
                <div class='list-element-importance-container'>
                ${this.html_importance_color()}
                </div>
                ${this.html_publish_date()}
            </div>
            <div id='details-container'>
                ${this.html_element_description()}
                <div class='list-element-menu-container'>
                ${this.html_delete_button()}
                ${this.html_edit_button()}
                ${this.html_project_button()}
                </div>
            </div>
        </div>`;
    }

    html_element_title() {
        return `<div class='list-element-title'>
        ${this.element_title}
        </div>`;
    }

    html_importance_color() {
        return `<div id='importance-color-indicator'></div>`;
    }

    html_publish_date() {
        return `
        <div class='list-element-publish-date'>${this.publish_date.toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' })}</div>`;
    }

    html_element_description() {
        return `<div id='element-description' class='list-element-description'>Please Wait...</div>`;
    }

    html_delete_button() {
        return `<input id='delete-button' type='button' value='Delete'>`;
    }

    html_edit_button() {
        return `<input id='edit-button' type='button' value='Edit'>`;
    }

    html_project_button() {
        return `<input id='start-project-button' type='button' value='Start Project'>`;
    }

}

customElements.define('l2-list-element', l2_list_element)
