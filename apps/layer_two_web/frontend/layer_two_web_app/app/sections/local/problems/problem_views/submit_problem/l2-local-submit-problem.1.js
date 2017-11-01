import {l2_local_leaflet_map} from "../../../../../elements/l2-local-leaflet-map.js"

export class l2_local_submit_problem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.setAttribute("render-template", "false");
        this.setAttribute("show-template", "false");
    }

    static get observedAttributes() {
        return ['render-template', 'show-template'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'render-template' && oldValue === 'false' && newValue === 'true'){
            this.render_template();
            window.dispatchEvent(new Event('resize'));
        }
        if(name === 'show-template' && oldValue === 'false' && newValue === 'true'){
            
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

    l2_local_view_style_show(){
        return `
        :host {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            flex-grow: 1;
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
            width: 50%;
            font-size: calc(6px + 0.7vw);
            justify-self: center;
        }

        form {
            height: 100%; 
            display: grid;
            grid-gap: 0.5vmin;
            grid-template-columns: max-content 1fr 1vw;
            grid-template-rows:min-content min-content 0.9fr repeat(6, min-content);
        }

        #form-problem-title {
            grid-row: 1;
            grid-column: 1/4;
            justify-self: center;
            align-self: center;
            font-size: calc(6px + 0.9vw);
        }

        #form-problem-text {
            grid-row: 2;
            justify-self: end;
        }

        #form-problem-input {
            font-size: calc(6px + 0.8vw);
            grid-row: 2;
            grid-column: 2;
        }

        #form-description-text {
            grid-row: 3;
            justify-self: end;
        }

        #form-description-input {
            font-size: calc(6px + 0.8vw);
            grid-row: 3;
            grid-column: 2;
        }

        #form-location-title {
            grid-row: 4;
            grid-column: 1/4;
            justify-self: center;
            align-self: center;
            font-size: calc(6px + 0.9vw);
        }

        #form-select-location-text {
            font-size: calc(6px + 0.5vw);
            grid-row: 5;
            grid-column: 1/4;
            justify-self: center;
        }

        #form-gps-text {
            grid-row: 6;
            grid-column: 1;
            justify-self: end;
        }

        #form-gps-button {
            font-size: calc(6px + 0.75vw);
            grid-row: 6;
            grid-column: 2;
            justify-self: end;
        }

        #form-latitude-text {
            grid-row: 7;
            justify-self: end;
        }

        #form-latitude-input {
            font-size: calc(6px + 0.8vw);
            text-align: right;
            grid-row: 7;
            grid-column: 2;
        }

        #form-longitude-text {
            grid-row: 8;
            justify-self: end;
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
            grid-column: 1/4;
            justify-self: center;
            align-self: center;
        }

        #leaflet-map {
            flex-grow: 1;
            min-height: 50vmin;
            height: unset;
            width: unset;
            justify-self: center;
        }
        
        @media screen and (max-width:550px){

            form {
                height: 100%;
                display: grid;
                grid-gap: 0.5vmin;
                grid-template-columns: max-content 1fr 1vw;
                grid-template-rows:min-content min-content 0.9fr repeat(6, min-content);
            }

            #input-form-container {
                flex-grow: 1;
                justify-self: center;
                font-size: 3vw;
            }

            #form-problem-title {
                grid-row: 1;
                grid-column: 1/3;
                justify-self: center;
                align-self: center;
                font-size: 3.5vw;
            }

            #form-problem-text {
                grid-row: 2;
                justify-self: end;
            }

            #form-problem-input {
                font-size: 3.5vw;
                grid-row: 2;
                grid-column: 2;
            }

            #form-description-text {
                grid-row: 3;
                justify-self: end;
            }

            #form-description-input {
                font-size: 3.5vw;
                grid-row: 3;
                grid-column: 2;
            }

            #form-location-title {
                grid-row: 4;
                grid-column: 1/3;
                justify-self: center;
                align-self: center;
                font-size: 3.5vw;
            }

            #form-select-location-text {
                font-size: 3vw;
                grid-row: 5;
                grid-column: 1/3;
                justify-self: center;
            }

            #form-gps-text {
                grid-row: 6;
                grid-column: 1;
                justify-self: end;
            }

            #form-gps-button {
                font-size: 3vw;
                grid-row: 6;
                grid-column: 2;
                justify-self: end;
            }

            #form-latitude-text {
                grid-row: 7;
                justify-self: end;
            }

            #form-latitude-input {
                font-size: 3.5vw;
                text-align: right;
                grid-row: 7;
                grid-column: 2;
            }

            #form-longitude-text {
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
                font-size: 3.5vw;
                grid-row: 9;
                grid-column: 1/3;
                justify-self: center;
                align-self: center;
            }

            #leaflet-map {
                width: 100%;
                justify-self: center;
            }
        }
        `;
    }

    template() {
        return `<template id="l2-local-view-template">
        <style>${this.l2_local_view_style_show()}</style>
        <div id="input-form-container">
          <form>
          <div id="form-problem-title">Local Problem Form</div>

          <div id="form-problem-text">Problem:</div>
          <input id="form-problem-input" required type="text">

          <div id="form-description-text">Description:</div>
          <textarea id="form-description-input" rows="4" required></textarea>

          <div id="form-location-title">Location</div>

          <div id="form-select-location-text">(select location from the map)</div>

          <div id="form-latitude-text">Latitude:</div>
          <input id="form-latitude-input" step="0.000001" min="-90" max="90" placeholder="00.000000" type="number">

          <div id="form-longitude-text">Longitude:</div>
          <input id="form-longitude-input" step="0.000001" min="-180" max="180" placeholder="000.000000" type="number">

          <div id="form-gps-text">Use GPS:</div>
          <input id="form-gps-button" type="button" value="GPS Coordinates"></button>
          
          <input id="submit-button" type="submit">
          </form>
        </div>
        <div id="leaflet-map">
          <l2-local-leaflet-map></l2-local-leaflet-map>
        </div>
        </template>
        `;
    }

}

customElements.define("l2-local-submit-problem", l2_local_submit_problem)
