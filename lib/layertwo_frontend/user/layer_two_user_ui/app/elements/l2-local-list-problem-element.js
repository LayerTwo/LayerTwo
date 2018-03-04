export class l2_local_list_problem_element extends HTMLElement{
    constructor(){
        super();
        this.marker_created = "false";
        this.local_problem_title = "";
        this.local_problem_description = "";
        this.attachShadow({ mode: 'open' });
        this.element_description_status = "hidden";
        document.addEventListener("l2-local-problem-list-element-clicked", this.handle_element_clicked.bind(this), true);
        document.addEventListener("l2-city-local-problem-description-update", this.handle_description_update.bind(this), true);
        document.addEventListener("l2-local-problems-list-map-ready", this.create_marker.bind(this), true);
        document.addEventListener("l2-local-problems-map-marker-created", this.marker_created_validate.bind(this), true);
    }

    connectedCallback(){
        this.local_problem_uuid = this.getAttribute("local-problem-uuid");
        this.local_problem_title = this.getAttribute("local-problem-title");
        this.local_problem_importance = parseInt(this.getAttribute("local-problem-importance"));
        this.local_problem_latitude = this.getAttribute("local-problem-latitude");
        this.local_problem_longitude = this.getAttribute("local-problem-longitude");
        this.local_problem_published_date = new Date(parseInt(this.getAttribute("local-problem-timestamp")));
        this.shadowRoot.innerHTML = this.html();
        this.shadowRoot.querySelector("#local-problem-title-container").addEventListener("pointerdown", event => this.emit_element_clicked());
        this.dispatchEvent(new CustomEvent("l2-local-problems-create-leaflet-marker", { detail:{local_problem_uuid: this.local_problem_uuid, 
                                                                                                       local_problem_latitude: this.local_problem_latitude, 
                                                                                                       local_problem_longitude: this.local_problem_longitude}, bubble: true, composed: true }));
    }

    create_marker(){
        if(this.marker_created === "false"){
            this.dispatchEvent(new CustomEvent("l2-local-problems-create-leaflet-marker", { detail:{local_problem_uuid: this.local_problem_uuid, 
                local_problem_latitude: this.local_problem_latitude, 
                local_problem_longitude: this.local_problem_longitude}, bubble: true, composed: true }));
        }

    }

    marker_created_validate(data){
        if(data.detail.marker_uuid === this.local_problem_uuid){
            this.marker_created = "true";
        }
    }

    handle_element_clicked(data){
        if(data.detail.local_problem_uuid === this.local_problem_uuid && this.element_description_status === "hidden"){
            if(this.local_problem_description === ""){
                this.dispatchEvent(new CustomEvent("l2-local-problem-element-description-request", { detail:{local_problem_uuid: this.local_problem_uuid}, bubble: true, composed: true }));
            }
            this.shadowRoot.querySelector("style").innerHTML = this.css_show_description();
            this.element_description_status = "showing";
        } else if(data.detail.local_problem_uuid === this.local_problem_uuid && this.element_description_status === "showing"){
            this.shadowRoot.querySelector("style").innerHTML = this.css_hide_description();
            this.element_description_status = "hidden";
        }
    }

    handle_description_update(data){
        if(data.detail.local_problem_uuid === this.local_problem_uuid){
            this.local_problem_description = data.detail.local_problem_description;
            this.shadowRoot.querySelector("#problem-description").innerHTML = this.local_problem_description;
        }
    }

    emit_element_clicked(){
        this.dispatchEvent(new CustomEvent("l2-local-problem-list-element-clicked", { detail:{local_problem_uuid: this.local_problem_uuid}, bubble: true, composed: true }));
    }

    css_hide_description(){
        return `
        ${this.css_default()}
        #problem-description{
            display: none;
        }
        `;
    }

    css_show_description(){
        return `
        ${this.css_default()}
        #problem-description{
            display: unset;
        }
        `;
    }

    importance_level_css_background(){
        switch(this.local_problem_importance){
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

    css_default(){
        return `
        :host{
            border: solid;
            border-width: thin;
            border-color: LightGray;
            box-shadow: 2px 2px 0px 2px #eeeeee, 3px 4px 1px #0d0d0d;
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
        }`;
    }

    html(){
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
        <div id="problem-description">${this.local_problem_description}</div>
        </div>
        `;
    }
}

customElements.define("l2-local-list-problem-element", l2_local_list_problem_element)