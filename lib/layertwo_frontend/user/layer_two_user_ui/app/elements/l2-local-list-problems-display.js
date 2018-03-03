import { l2_local_list_problem_element } from "./l2-local-list-problem-element.js"

export class l2_local_list_problems_display extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.html();
        document.addEventListener("l2-city-local-init-problems-list", this.handle_local_init_problems_list.bind(this), true);
    }

    handle_local_init_problems_list(data) {
        if (data.detail.local_problems_init_list.length === 0) {
            this.shadowRoot.querySelector("#l2-city-local-problems-list").innerHTML = "";
        } else {
            if (this.shadowRoot.querySelector("#l2-city-local-problems-list").childElementCount === 0) {
                if(this.shadowRoot.querySelector("#l2-city-local-problems-list").innerHTML === "Please Wait..."){
                    this.shadowRoot.querySelector("#l2-city-local-problems-list").innerHTML = "";
                }
                for (let i = 0; i < data.detail.local_problems_init_list.length; i++) {
                    this.local_problem_uuid = data.detail.local_problems_init_list[i]["LocalProblem.local_problem_uuid"];
                    if (this.shadowRoot.querySelector(`l2-local-list-problem-element[local-problem-uuid="${this.local_problem_uuid}"]`) === null) {
                        let local_problem_element = document.createElement("l2-local-list-problem-element");
                        local_problem_element.setAttribute("local-problem-uuid", this.local_problem_uuid);
                        local_problem_element.setAttribute("local-problem-title", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_title"]);
                        local_problem_element.setAttribute("local-problem-importance", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_importance"]);
                        local_problem_element.setAttribute("local-problem-latitude", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_latitude"]);
                        local_problem_element.setAttribute("local-problem-longitude", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_longitude"]);
                        local_problem_element.setAttribute("local-problem-timestamp", data.detail.local_problems_init_list[i]["LocalProblem.timestamp"]);
                        this.shadowRoot.querySelector("#l2-city-local-problems-list").appendChild(local_problem_element);
                    }
                }
            } else {
                if(this.shadowRoot.querySelector("#l2-city-local-problems-list").innerHTML === "Please Wait..."){
                    this.shadowRoot.querySelector("#l2-city-local-problems-list").innerHTML = "";
                }
                for (let i = 0; i < data.detail.local_problems_init_list.length; i++) {
                    this.local_problem_uuid = data.detail.local_problems_init_list[i]["LocalProblem.local_problem_uuid"];
                    if (this.shadowRoot.querySelector(`l2-local-list-problem-element[local-problem-uuid="${this.local_problem_uuid}"]`) === null) {
                        let local_problem_element = document.createElement("l2-local-list-problem-element");
                        local_problem_element.setAttribute("local-problem-uuid", this.local_problem_uuid);
                        local_problem_element.setAttribute("local-problem-title", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_title"]);
                        local_problem_element.setAttribute("local-problem-importance", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_importance"]);
                        local_problem_element.setAttribute("local-problem-latitude", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_latitude"]);
                        local_problem_element.setAttribute("local-problem-longitude", data.detail.local_problems_init_list[i]["LocalProblem.local_problem_longitude"]);
                        local_problem_element.setAttribute("local-problem-timestamp", data.detail.local_problems_init_list[i]["LocalProblem.timestamp"]);
                        this.shadowRoot.querySelector("#l2-city-local-problems-list").prepend(local_problem_element);

                    }
                }
            }
        }
    }

    css() {
        return `
        :host{
            display: grid;
            grid-gap: 0.5vmin;
            height: 0vh;
        }

        #l2-city-local-problems-list{
            display: grid;
            grid-gap: 0.8vmax;
            margin-right: 0.5vmax;
            margin-left: 0.5vmax;
        }
        `;
    }

    html() {
        return `<style>${this.css()}</style>
        <div id="l2-city-local-problems-list">Please Wait...</div>
        `;
    }

}

customElements.define("l2-local-list-problems-display", l2_local_list_problems_display)