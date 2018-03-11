export class l2_local_list_problem_element extends HTMLElement {
    constructor() {
        super();
        this.marker_created = "false";
        this.local_problem_title = "";
        this.local_problem_description = "";
        this.attachShadow({ mode: 'open' });
        this.element_description_status = "hidden";
        document.addEventListener("l2-local-problem-list-element-clicked", this.handle_element_clicked.bind(this), true);
        document.addEventListener("l2-local-problem-list-marker-clicked", this.handle_element_clicked.bind(this), true);
        document.addEventListener("l2-city-local-problem-description-update", this.handle_description_update.bind(this), true);
        document.addEventListener("l2-local-problems-list-map-ready", this.create_marker.bind(this), true);
        document.addEventListener("l2-local-problems-map-marker-created", this.marker_created_validate.bind(this), true);
        document.addEventListener("l2-city-local-update-local-problem", this.update_problem.bind(this), true);
    }

    connectedCallback() {
        this.local_problem_uuid = this.getAttribute("local-problem-uuid");
        this.local_problem_title = this.getAttribute("local-problem-title");
        this.local_problem_importance = parseInt(this.getAttribute("local-problem-importance"));
        this.local_problem_latitude = this.getAttribute("local-problem-latitude");
        this.local_problem_longitude = this.getAttribute("local-problem-longitude");
        this.edit_button_css = this.show_edit_button();
        this.delete_button_css = this.show_delete_button();
        this.local_problem_published_date = new Date(parseInt(this.getAttribute("local-problem-timestamp")));
        document.addEventListener("l2-city-local-delete-local-problem-element",this.delete_local_problem.bind(this), true);
        this.shadowRoot.innerHTML = this.html();
        this.shadowRoot.querySelector("#local-problem-title-container").addEventListener("pointerdown", event => this.emit_element_clicked());
        this.shadowRoot.querySelector("#local-problem-start-project-button").addEventListener("pointerdown", event => this.handle_start_project_button_clicked());
        this.shadowRoot.querySelector("#local-problem-edit-button").addEventListener("pointerdown", event => this.handle_edit_button_clicked());
        this.shadowRoot.querySelector("#local-problem-delete-button").addEventListener("pointerdown", event => this.handle_delete_button_clicked());
        this.dispatchEvent(new CustomEvent("l2-local-problems-create-leaflet-marker", {
            detail: {
                local_problem_uuid: this.local_problem_uuid,
                local_problem_title: this.local_problem_title,
                local_problem_latitude: this.local_problem_latitude,
                local_problem_longitude: this.local_problem_longitude
            }, bubble: true, composed: true
        }));
    }

    update_problem(data){
        if(data.detail.update.local_problem_uuid === this.local_problem_uuid){
            this.local_problem_title = data.detail.update.local_problem_title;
            this.local_problem_importance = parseInt(data.detail.update.local_problem_importance);
            this.local_problem_description = data.detail.update.local_problem_description;
            this.local_problem_latitude = parseFloat(data.detail.update.local_problem_latitude);
            this.local_problem_longitude = parseFloat(data.detail.update.local_problem_longitude);
            this.shadowRoot.innerHTML = this.html();
            this.dispatchEvent(new CustomEvent("l2-local-problems-remove-leaflet-marker",{detail:{local_problem_uuid: this.local_problem_uuid},bubble: true, composed: true
             }));
            this.shadowRoot.querySelector("#local-problem-title-container").addEventListener("pointerdown", event => this.emit_element_clicked());
            this.shadowRoot.querySelector("#local-problem-start-project-button").addEventListener("pointerdown", event => this.handle_start_project_button_clicked());
            this.shadowRoot.querySelector("#local-problem-edit-button").addEventListener("pointerdown", event => this.handle_edit_button_clicked());
            this.shadowRoot.querySelector("#local-problem-delete-button").addEventListener("pointerdown", event => this.handle_delete_button_clicked());
            this.dispatchEvent(new CustomEvent("l2-local-problems-create-leaflet-marker", {
            detail: {
                local_problem_uuid: this.local_problem_uuid,
                local_problem_title: this.local_problem_title,
                local_problem_latitude: this.local_problem_latitude,
                local_problem_longitude: this.local_problem_longitude
                    }, bubble: true, composed: true
                    }));
            this.element_description_status = "hidden";
        }
    }

    handle_start_project_button_clicked() {

    }

    handle_edit_button_clicked() {
        this.dispatchEvent(new CustomEvent("l2-local-problems-edit-local-problem", {
            detail: {
                local_problem_uuid: this.local_problem_uuid,
                local_problem_title: this.local_problem_title,
                local_problem_importance: this.local_problem_importance,
                local_problem_description: this.local_problem_description,
                local_problem_latitude: this.local_problem_latitude,
                local_problem_longitude: this.local_problem_longitude
            }, bubble: true, composed: true
        }));
    }

    handle_delete_button_clicked() {
        if (this.deletion_warning_element === undefined) {
            this.shadowRoot.querySelector("#local-problem-delete-button").disabled = true;
            this.shadowRoot.querySelector("#local-problem-edit-button").disabled = true;
            this.shadowRoot.querySelector("#local-problem-start-project-button").disabled = true;
            this.deletion_warning_element = document.createElement("div");
            this.deletion_warning_element.innerHTML = `
        <div id="deletion-warning-container">
        <div id="deletion-warning-text">Are you sure you want to delete this problem?</div>
        <input id="local-problem-delete-confirm-button" type="button" value="Yes Delete">
        <input id="local-problem-delete-cancel-button" type="button" value="Cancel">
        </div>`
            this.shadowRoot.querySelector("#local-problem-container").appendChild(this.deletion_warning_element);
            this.shadowRoot.querySelector("#local-problem-delete-cancel-button").addEventListener("pointerdown", event => this.handle_delete_cancel_button_clicked());
            this.shadowRoot.querySelector("#local-problem-delete-confirm-button").addEventListener("pointerdown", event => this.handle_delete_confirm_button_clicked());
        }
    }

    delete_local_problem(data){
        if(this.local_problem_uuid === data.detail.local_problem_uuid){
            this.dispatchEvent(new CustomEvent("l2-local-problems-remove-leaflet-marker", {
                detail: {local_problem_uuid: data.detail.local_problem_uuid}, bubble: true, composed: true 
            }));
            this.dispatchEvent(new CustomEvent("l2-city-local-update-problems-count",{detail: {remove_one: "true"}, bubble: true, composed: true}));
            this.remove();
        }
    }

    handle_delete_cancel_button_clicked(){
        this.deletion_warning_element.remove();
        this.deletion_warning_element = undefined;
        this.shadowRoot.querySelector("#local-problem-delete-button").disabled = false;
        this.shadowRoot.querySelector("#local-problem-edit-button").disabled = false;
        this.shadowRoot.querySelector("#local-problem-start-project-button").disabled = false;
    }

    handle_delete_confirm_button_clicked(){
        this.shadowRoot.querySelector("#local-problem-delete-cancel-button").disabled = true;
        this.shadowRoot.querySelector("#local-problem-delete-confirm-button").disabled = true;
        this.dispatchEvent(new CustomEvent("l2-local-problem-delete-confirm-button-clicked", {
            detail: {local_problem_uuid: this.local_problem_uuid}, bubble: true, composed: true 
        }));
    }

    show_edit_button() {
        if (this.getAttribute("local-problem-author") === "true") {
            return `display: unset;`;
        } else {
            return `display: none;`;
        }
    }

    show_delete_button() {
        if (this.getAttribute("local-problem-author") === "true") {
            return `display: unset;`;
        } else {
            return `display: none;`;
        }
    }

    create_marker() {
        if (this.marker_created === "false") {
            this.dispatchEvent(new CustomEvent("l2-local-problems-create-leaflet-marker", {
                detail: {
                    local_problem_uuid: this.local_problem_uuid,
                    local_problem_latitude: this.local_problem_latitude,
                    local_problem_longitude: this.local_problem_longitude
                }, bubble: true, composed: true
            }));
        }

    }

    marker_created_validate(data) {
        if (data.detail.marker_uuid === this.local_problem_uuid) {
            this.marker_created = "true";
        }
    }

    handle_element_clicked(data) {
        if (data.detail.local_problem_uuid === this.local_problem_uuid && this.element_description_status === "hidden") {
            if (this.local_problem_description === "") {
                this.dispatchEvent(new CustomEvent("l2-local-problem-element-description-request", { detail: { local_problem_uuid: this.local_problem_uuid }, bubble: true, composed: true }));
            }
            this.shadowRoot.querySelector("style").innerHTML = this.css_show_description();
            this.element_description_status = "showing";
        } else if (data.detail.local_problem_uuid === this.local_problem_uuid && this.element_description_status === "showing") {
            this.shadowRoot.querySelector("style").innerHTML = this.css_hide_description();
            this.element_description_status = "hidden";
        }
    }

    handle_description_update(data) {
        if (data.detail.local_problem_uuid === this.local_problem_uuid) {
            this.local_problem_description = data.detail.local_problem_description;
            this.shadowRoot.querySelector("#problem-description").innerHTML = this.local_problem_description;
        }
    }

    emit_element_clicked() {
        this.dispatchEvent(new CustomEvent("l2-local-problem-list-element-clicked", { detail: { local_problem_uuid: this.local_problem_uuid }, bubble: true, composed: true }));
    }

    css_hide_description() {
        return `
        ${this.css_default()}
        #problem-details-container{
            display: none;
        }
        #local-problem-title-container{
            background: unset;
        }
        `;
    }

    css_show_description() {
        return `
        ${this.css_default()}
        #problem-details-container{
            display: unset;
        }
        
        #local-problem-title-container{
            background: WhiteSmoke;
        }
        `;
    }

    importance_level_css_background() {
        switch (this.local_problem_importance) {
            case 0:
                return `background: rgba(255, 255, 255, 1);`;
                break;

            case 1:
                return `background: rgba(0, 255, 0, 1);`;
                break;

            case 2:
                return `background: rgba(0, 200, 255, 1);`;
                break;

            case 3:
                return `background: rgba(255, 255, 0, 1);`;
                break;

            case 4:
                return `background: rgba(255, 0, 0, 1);`;
                break;

            default:
                console.log("Local Problem Importance Value Not Set!");
        }
    }

    css_default() {
        return `
        :host{
            border: solid;
            border-width: thin;
            border-color: LightGray;
            box-shadow: 2px 2px 0px 2px #eeeeee, 3px 4px 1px #0d0d0d;
        }

        #deletion-warning-container{
            display: grid;
            padding: 0.4vmax;
            grid-gap: 0.5vmax;
            grid-template-rows: max-content min-content;
            grid-template-columns: 1fr 1fr;
            background: red;
        }
        #deletion-warning-text{
            grid-row: 1;
            grid-column: 1/3;
            color: white;
            font-weight: bold;
            justify-self: center;
            align-self: center;
        }

        #local-problem-container{
            display: grid;
            grid-template-rows: min-content min-content;
        }

        #problem-title{
            grid-row: 1;
            grid-column: 1;
            padding: 1vmax;
            font-size: calc(6px + 0.7vw);
        }

        #problem-importance-container{
            grid-row: 1;
            grid-column: 2;
            display: grid;
        }

        #problem-importance-spacer{
            display: grid;
            grid-template-columns: 0.04fr;
        }
        
        #importance-color-indicator{
            margin-right: 0.5vmax;
            align-self: center;
            border: solid;
            border-width: thin;
            border-radius: 100vh;
            border-color: LightGrey;
            width: 0.5vmax;
            height: 0.5vmax;
            grid-row: 1;
            grid-column: 1;
            ${this.importance_level_css_background()}
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }

        #local-problem-title-container{
            display: grid;
            grid-template-rows: min-content min-content;
            grid-template-columns: 1fr min-content;
        }
        
        #local-problem-title-container:hover{
            cursor: pointer;
            background: WhiteSmoke;
        }
        
        #local-problem-published-date{
            font-size: calc(6px + 0.5vw);
            grid-row: 2;
            grid-column: 1/3;
            justify-self: end;
            margin-right: 0.3vmax;
        }

        #problem-details-container{
            display: grid;
            grid-template-rows: 1fr min-content;
        }

        #problem-description{
            padding: 0.6vmax;
        }

        #problem-menu-container{
            display: grid;
            grid-gap: 0.5vmax;
            padding: 0.4vmax;
            grid-template-columns: auto repeat(3, min-content);
        }

        #local-problem-delete-button{
            ${this.delete_button_css}
            font-size: calc(6px + 0.7vw);
            grid-column: 2;
        }

        #local-problem-delete-confirm-button{
            justify-self: center;
            font-size: calc(6px + 0.7vw);
        }

        #local-problem-delete-cancel-button{
            justify-self: center;
            font-size: calc(6px + 0.7vw);
        }

        #local-problem-edit-button{
            ${this.edit_button_css}
            font-size: calc(6px + 0.7vw);
            grid-column: 3;
        }

        #local-problem-start-project-button{
            font-size: calc(6px + 0.7vw);
            grid-column: 4;
        }

        #local-problem-delete-confirm-button:hover{
            cursor: pointer;
        }

        #local-problem-delete-cancel-button:hover{
            cursor: pointer;
        }
        #local-problem-delete-button:hover{
            cursor: pointer;
        }

        #local-problem-edit-button:hover{
            cursor: pointer;
        }

        #local-problem-start-project-button:hover{
            cursor: pointer;
        }

        @media screen and (max-width:550px){
            #problem-title{
                grid-row: 1;
                grid-column: 1;
                padding: 1vmax;
                font-size: 3.5vw;
            }

            #local-problem-published-date{
                font-size: 3vw;
                grid-row: 2;
                grid-column: 1/3;
                justify-self: end;
                margin-right: 0.3vmax;
            }

            #local-problem-delete-button{
                font-size: 4vw;
            }            
            
            #local-problem-edit-button{
                font-size: 4vw;
            }

            #local-problem-start-project-button{
                font-size: 4vw;
            }

            #local-problem-delete-confirm-button{
                font-size: 4vw;
            }

            #local-problem-delete-cancel-button{
                font-size: 4vw;
            }
        }`;
    }

    html() {
        return `
        <style>${this.css_hide_description()}</style>
        <div id="local-problem-container">
        <div id="local-problem-title-container">
           <div id="problem-title">${this.local_problem_title}</div>
              <div id="problem-importance-container">
              <div id="importance-color-indicator"></div>
              </div>
              <div id="local-problem-published-date">${this.local_problem_published_date.toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' })}</div>
        </div>
        <div id="problem-details-container">
        <div id="problem-description">${this.local_problem_description}</div>
        <div id="problem-menu-container">
        <input id="local-problem-delete-button" type="button" value="Delete">
        <input id="local-problem-edit-button" type="button" value="Edit">
        <input id="local-problem-start-project-button" type="button" value="Start Project">
        </div>
        </div>
        </div>
        `;
    }
}

customElements.define("l2-local-list-problem-element", l2_local_list_problem_element)