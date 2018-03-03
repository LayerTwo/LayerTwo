import {l2_local_leaflet_map_problem_form} from "../../../../../elements/l2-local-leaflet-map-problem-form.js"

export class l2_local_submit_problem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
        this.addEventListener("l2-leaflet-local-problem-form-latlgn", this.add_lat_lng_to_form_inputs);
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'render-template' && oldValue === 'false' && newValue === 'true'){
            window.dispatchEvent(new Event('resize'));
            this.render_template();
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            window.dispatchEvent(new Event('resize'));
            this.show_template();            
        }
        if(name === 'show-template' && oldValue === 'true' && newValue === 'false'){
            this.hide_template();
        }
    }

    render_template(){
        let content = document.importNode(this.shadowRoot.querySelector("#l2-local-view-template").content, true);
        this.shadowRoot.appendChild(content);
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
        this.shadowRoot.querySelector("#local-problems-form").addEventListener("submit", event => this.submit_form(event));
        this.shadowRoot.querySelector("#form-gps-button").addEventListener("pointerdown", event => this.get_gps_coordinates_from_device());
    }

    hide_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_hide();
    }

    show_template(){
        this.shadowRoot.querySelector("style").innerHTML = this.l2_local_view_style_show();
    }

    l2_local_view_style_hide(){
        return `
        :host {
            display: none;
            background: white;
        }
        `;
    }

    add_lat_lng_to_form_inputs(event_data){
        this.shadowRoot.querySelector("#form-latitude-input").value = parseFloat(event_data.detail.latitude.toFixed(5));
        this.shadowRoot.querySelector("#form-longitude-input").value = parseFloat(event_data.detail.longitude.toFixed(5));
    }

    add_lat_lng_to_form_inputs_from_gps_device(position){
        this.shadowRoot.querySelector("#form-latitude-input").value = parseFloat(position.coords.latitude.toFixed(5));
        this.shadowRoot.querySelector("#form-longitude-input").value = parseFloat(position.coords.longitude.toFixed(5));
        this.dispatchEvent(new CustomEvent("l2-update-local-problem-submit-map-marker-position", {detail: {position: position}, bubble: true, composed: true}));
    }

    get_gps_coordinates_from_device(){
        navigator.geolocation.getCurrentPosition( position => this.add_lat_lng_to_form_inputs_from_gps_device(position));
    }

    submit_form(event){
        event.preventDefault();
        this.form_problem_title = this.shadowRoot.querySelector("#form-problem-input").value;
        this.form_problem_importance_level = this.shadowRoot.querySelector("#form-problem-importance-slider").value;
        this.form_problem_description = this.shadowRoot.querySelector("#form-description-input").value;
        this.form_problem_latitude = this.shadowRoot.querySelector("#form-latitude-input").value;
        this.form_problem_longitude = this.shadowRoot.querySelector("#form-longitude-input").value;
        this.dispatchEvent(new CustomEvent("l2-city-local-problem-form-data-submit", { detail: {problem_title: this.form_problem_title,
                                                                                                problem_importance: this.form_problem_importance_level, 
                                                                                                problem_description: this.form_problem_description, 
                                                                                                problem_latitude: this.form_problem_latitude, 
                                                                                                problem_longitude: this.form_problem_longitude},
                                                                                                bubble: true, composed: true }));
    }

    l2_local_view_style_show(){
        return `
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr;
            height: 100%;
            background: white;
            padding-right: 1vw;
            padding-top: 1vh;
            padding-left: 1vw;
        }

        textarea {
            resize: none;
            padding: 0px;
            margin: 0px;
            overflow-x: hidden;
        }

        #input-form-container {
            width: 100%;
            font-size: calc(6px + 0.7vw);
            justify-self: center;
        }

        #local-problems-form {
            justify-content: center;
            height: 100%; 
            display: grid;
            grid-gap: 0.5vmin;
            grid-template-columns: max-content 1fr 1vw;
            grid-template-rows: repeat(4, min-content) 0.9fr repeat(4, min-content);
        }

        #form-problem-heading {
            grid-row: 1;
            grid-column: 2/4;
            justify-self: center;
            align-self: center;
            font-size: calc(6px + 1vw);
        }

        #form-problem-title {
            grid-row: 2;
            justify-self: end;
            align-self: center;
        }

        #form-problem-input {
            font-size: calc(6px + 0.8vw);
            grid-row: 2;
            grid-column: 2;
        }

        #form-problem-importance-levels-titles{
            user-select: none;
            font-size: calc(6px + 0.7vw);
            justify-items: center;
            align-items: start;
            grid-row: 3;
            grid-column: 2;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
        }

        #form-problem-importance-title{
            font-size: calc(6px + 0.7vw);
            grid-row: 4;
            grid-column: 1;
            justify-self: end;
            align-self: center;
        }

        #form-problem-importance-background{
            height: 0.3vmax;
            width: 100%;
            align-self: center;
            grid-row: 4;
            grid-column: 2;
            background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 20%, rgba(0, 255, 0, 1) 20%, rgba(0, 255, 0, 1) 40%, rgb(0, 200, 255) 40%, rgba(0, 200, 255, 1) 60%, rgba(255, 255, 0, 1) 60%, rgba(255, 255, 0, 1) 80%, rgb(255, 0, 0) 80%,rgb(255, 0, 0) 100%);
            display: grid;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }

        #form-problem-importance-slider{
            -webkit-appearance: none;
            -moz-appearance: none;
            background: none;
            width: 84%;
            justify-self: center;
            grid-row: 4;
            grid-column: 2;
        }

        #form-problem-importance-slider:focus {
            outline: none;
        }

        #form-problem-importance-slider::-webkit-slider-thumb:hover {
            cursor: pointer;
        }

        #form-problem-importance-slider::-webkit-slider-thumb{
            -webkit-appearance: none;
            -moz-appearance: none;
            min-width: 7px;
            width: 0.9vmax;
            height: 2vmax;
            background: white;
            border: solid;
            border-width: thin;
            border-color: black;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
 
        #form-description-title {
            grid-row: 5;
            justify-self: end;
        }

        #form-description-input {
            font-size: calc(6px + 0.7vw);
            grid-row: 5;
            grid-column: 2;
        }

        #form-location-title {
            grid-row: 6;
            grid-column: 1;
            justify-self: end;
            align-self: center;
            font-size: calc(6px + 0.7vw);
        }

        #form-gps-text-container{
            font-size: calc(6px + 0.75vw);
            grid-row: 6;
            grid-column: 2;
            justify-self: end;
        }

        #form-gps-button {
            font-size: calc(6px + 0.75vw);
            grid-row: 6;
            grid-column: 2;
            justify-self: end;
            align-self: center;
        }

        #form-gps-button:hover{
            cursor: pointer;
        }

        #form-latitude-title {
            grid-row: 7;
            justify-self: end;
            align-self: center;
        }

        #form-latitude-input {
            font-size: calc(6px + 0.8vw);
            text-align: right;
            grid-row: 7;
            grid-column: 2;
        }

        #form-longitude-title {
            grid-row: 8;
            justify-self: end;
            align-self: center;
        }

        #form-longitude-input {
            font-size: calc(6px + 0.8vw);
            text-align: right;
            grid-row: 8;
            grid-column: 2;
        }

        #submit-button{
            font-size: calc(6px + 0.9vw);
            grid-row: 9;
            grid-column: 2/4;
            justify-self: center;
            align-self: center;
        }

        #submit-button:hover{
            cursor: pointer;
        }
        
        @media screen and (max-width:550px){
            :host {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr;
                height: 100%;
                background: white;
                padding-right: 1vw;
                padding-top: 1vh;
                padding-left: 1vw;
            }

            #local-problems-form {
                height: 100%;
                display: grid;
                grid-gap: 0.5vmin;
                grid-template-columns: max-content 1fr 1vw;
                grid-template-rows: repeat(4, min-content) 0.9fr repeat(4, min-content);
            }

            #input-form-container {
                justify-self: center;
                font-size: 3vw;
            }

            #form-problem-heading {
                grid-row: 1;
                grid-column: 1/3;
                justify-self: center;
                align-self: center;
                font-size: 4vw;
            }

            #form-problem-title {
                grid-row: 2;
                justify-self: end;
            }

            #form-problem-input {
                font-size: 3.5vw;
                grid-row: 2;
                grid-column: 2;
            }

            #form-problem-importance-levels-titles{
                grid-row: 3;
                grid-column: 2;
                font-size: 2.5vw;
            }

            #form-problem-importance-title{
                grid-row: 4;
                grid-column: 1;
                font-size: 3vw;
                justify-self: end;
            }

            #form-problem-importance-background{
                grid-row: 4;
                grid-column: 2;
            }
    
            #form-problem-importance-slider{
                grid-row: 4;
                grid-column: 2;
            }

            #form-description-title {
                grid-row: 5;
                justify-self: end;
            }

            #form-description-input {
                font-size: 3.5vw;
                grid-row: 5;
                grid-column: 2;
            }

            #form-location-title {
                grid-row: 6;
                grid-column: 1;
                justify-self: end;
                align-self: center;
                font-size: 3vw;
            }

            #form-gps-text-container{
                font-size: 3vw;
                grid-row: 6;
                grid-column: 2;
                justify-self: end;
            }

            #form-gps-button {
                font-size: 4vw;
                grid-row: 6;
                grid-column: 2;
                justify-self: end;
            }

            #form-latitude-title {
                grid-row: 7;
                justify-self: end;
            }

            #form-latitude-input {
                font-size: 3.5vw;
                text-align: right;
                grid-row: 7;
                grid-column: 2;
            }

            #form-longitude-title {
                grid-row: 8;
                justify-self: end;
            }

            #form-longitude-input {
                font-size: 3.5vw;
                text-align: right;
                grid-row: 8;
                grid-column: 2;
            }

            #submit-button{
                font-size: 4.2vw;
                grid-row: 9;
                grid-column: 1/3;
                justify-self: center;
                align-self: center;
            }
        }
        `;
    }

    template() {
        return `<template id="l2-local-view-template">
        <style>${this.l2_local_view_style_show()}</style>
        <div id="input-form-container">
          <form id="local-problems-form">
          <div id="form-problem-heading">Local Problem Form</div>

          <div id="form-problem-title">Title:</div>
          <input id="form-problem-input" required type="text">

          <div id="form-problem-importance-background"></div>
          <div id="form-problem-importance-title">Importance:</div>
          <input id="form-problem-importance-slider" type="range" min="0" max="4" step="1" value="0">
          
          <div id="form-problem-importance-levels-titles">
          <div>Neutral</div>
          <div>Low</div>
          <div>Medium</div>
          <div>High</div>
          <div>Critical</div>
          </div>

          <div id="form-description-title">Description:</div>
          <textarea id="form-description-input" rows="4" required></textarea>

          <div id="form-location-title">Location:</div>

          <div id="form-latitude-title">Latitude:</div>
          <input id="form-latitude-input" step="0.000001" min="-90" max="90" placeholder="00.00000" required type="number">

          <div id="form-longitude-title">Longitude:</div>
          <input id="form-longitude-input" step="0.000001" min="-180" max="180" placeholder="000.00000" required type="number">

          <div id="form-gps-text-container">Select from the Map or use <input id="form-gps-button" type="button" value="GPS Device"></button></div>
          
          <input id="submit-button" value="Submit" type="submit"/>
          </form>
        </div>
        <div id="leaflet-map">
          <l2-local-leaflet-map-problem-form></l2-local-leaflet-map-problem-form>
        </div>
        </template>
        `;
    }

}

customElements.define("l2-local-submit-problem", l2_local_submit_problem)
