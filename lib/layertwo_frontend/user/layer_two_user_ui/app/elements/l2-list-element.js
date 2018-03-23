export class l2_list_element extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.list_element_uuid = this.getAttribute("l2-list-element-uuid");
        this.list_element_mode = this.getAttribute("l2-list-element-mode");

        document.addEventListener(`l2-list-element-mbox-uuid-${this.list_element_uuid}`, this.handle_mbox_message.bind(this), true);
        this.list_element_init();
    }

    list_element_init() {
        switch (this.list_element_mode) {
            case 'local-problem':
                this.local_problem_mode();
                break;

            case 'local-goal':
                this.local_goal_mode();
                break;
            default:
                console.log('Error list element mode init.');
        }
    }

    // Local Problem mode

    local_problem_mode(){
        this.shadowRoot.innerHTML = this.problem_html();
        this.problem_attach_listeners();
    }

    local_problem_html() {
        return `
        <style>${this.css_hide_description()}</style>
        <div id="problem-container">
        <div id="problem-title-container">
           <div id="problem-title">${this.problem_title}</div>
              <div id="problem-importance-container">
              <div id="importance-color-indicator"></div>
              </div>
              <div id="problem-published-date">${this.problem_published_date.toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' })}</div>
        </div>
        <div id="problem-details-container">
        <div id="problem-description">${this.problem_description}</div>
        <div id="problem-menu-container">
        <input id="problem-delete-button" type="button" value="Delete">
        <input id="problem-edit-button" type="button" value="Edit">
        <input id="problem-start-project-button" type="button" value="Start Project">
        </div>
        </div>
        </div>
        `;
    }

    local_problem_attach_listeners(){

    }

    css_local_problem_default() {
        return `
        :host{
            border: solid;
            border-width: thin;
            border-color: LightGray;
            background: white;
            box-shadow: 2px 2px 0px 2px #eeeeee, 3px 4px 1px #0d0d0d;
        }

        #deletion-warning-container{
            display: grid;
            padding: 0.4vmax;
            grid-gap: 0.5vmax;
            grid-template-rows: max-content min-content;
            grid-template-columns: 1fr 1fr;
            background: #1e1e1e;
        }
        #deletion-warning-text{
            grid-row: 1;
            grid-column: 1/3;
            color: white;
            font-weight: bold;
            justify-self: center;
            align-self: center;
        }

        #problem-container{
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

        #problem-title-container{
            display: grid;
            grid-template-rows: min-content min-content;
            grid-template-columns: 1fr min-content;
        }
        
        #problem-title-container:hover{
            cursor: pointer;
            background: #e9e9e9;
        }
        
        #problem-published-date{
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

        #problem-delete-button{
            ${this.delete_button_css}
            font-size: calc(6px + 0.7vw);
            grid-column: 2;
        }

        #problem-delete-confirm-button{
            justify-self: center;
            font-size: calc(6px + 0.7vw);
        }

        #problem-delete-cancel-button{
            justify-self: center;
            font-size: calc(6px + 0.7vw);
        }

        #problem-edit-button{
            ${this.edit_button_css}
            font-size: calc(6px + 0.7vw);
            grid-column: 3;
        }

        #problem-start-project-button{
            font-size: calc(6px + 0.7vw);
            grid-column: 4;
        }

        #problem-delete-confirm-button:hover{
            cursor: pointer;
        }

        #problem-delete-cancel-button:hover{
            cursor: pointer;
        }
        #problem-delete-button:hover{
            cursor: pointer;
        }

        #problem-edit-button:hover{
            cursor: pointer;
        }

        #problem-start-project-button:hover{
            cursor: pointer;
        }

        @media screen and (max-width:550px){
            #problem-title{
                grid-row: 1;
                grid-column: 1;
                padding: 1vmax;
                font-size: 3.5vw;
            }

            #problem-published-date{
                font-size: 3vw;
                grid-row: 2;
                grid-column: 1/3;
                justify-self: end;
                margin-right: 0.3vmax;
            }

            #problem-delete-button{
                font-size: 4vw;
            }            
            
            #problem-edit-button{
                font-size: 4vw;
            }

            #problem-start-project-button{
                font-size: 4vw;
            }

            #problem-delete-confirm-button{
                font-size: 4vw;
            }

            #problem-delete-cancel-button{
                font-size: 4vw;
            }
        }`;
    }

    // Local Goal mode

}

customElements.define("l2-list-element", l2_list_element)