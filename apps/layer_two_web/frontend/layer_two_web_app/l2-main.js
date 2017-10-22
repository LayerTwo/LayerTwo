import { l2_main_nav } from "./app/l2-main-nav.js"
import { l2_main_stage } from "./app/l2-main-stage.js"
import { l2_main_copyright } from "./app/l2-main-copyright.js"

export class l2_main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.addEventListener("l2-main-nav Personal", this.show_main_stage_personal);
        this.addEventListener("l2-main-nav Social", this.show_main_stage_social);
        this.addEventListener("l2-main-nav Local", this.show_main_stage_local);
        this.addEventListener("l2-main-nav City", this.show_main_stage_city);
        this.addEventListener("l2-main-nav Country", this.show_main_stage_country);
        this.addEventListener("l2-main-nav World", this.show_main_stage_world);
        this.addEventListener("l2-main-nav Space", this.show_main_stage_space);
        this.addEventListener("l2-main-nav Visit", this.show_main_stage_visit);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
        this.l2_main_nav_state();
    }

    l2_main_nav_state() {
        switch (localStorage.getItem("l2-main-nav")) {
            case "personal":
                this.show_main_stage_personal();
                break;

            case "social":
                this.show_main_stage_social();
                break;

            case "local":
                this.show_main_stage_local();
                break;

            case "city":
                this.show_main_stage_city();
                break;

            case "country":
                this.show_main_stage_country();
                break;

            case "world":
                this.show_main_stage_world();
                break;

            case "space":
                this.show_main_stage_space();
                break;

            case "visit":
                this.show_main_stage_visit();
                break;
            default:
                this.show_main_stage_personal();
        }
    }

    show_main_stage_personal() {
        localStorage.setItem("l2-main-nav", "personal");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Personal");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Personal");
    }

    show_main_stage_social() {
        localStorage.setItem("l2-main-nav", "social");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Social");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Social");
    }

    show_main_stage_local() {
        localStorage.setItem("l2-main-nav", "local");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Local");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Local");
    }

    show_main_stage_city() {
        localStorage.setItem("l2-main-nav", "city");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "City");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "City");
    }

    show_main_stage_country() {
        localStorage.setItem("l2-main-nav", "country");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Country");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Country");
    }

    show_main_stage_world() {
        localStorage.setItem("l2-main-nav", "world");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "World");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "World");
    }

    show_main_stage_space() {
        localStorage.setItem("l2-main-nav", "space");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Space");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Space");
    }

    show_main_stage_visit() {
        localStorage.setItem("l2-main-nav", "visit");
        this.shadowRoot.querySelector("l2-main-stage").setAttribute("main-section-display", "Visit");
        this.shadowRoot.querySelector("l2-main-nav").setAttribute("selected-button", "Visit");
    }


    l2_main_default_style() {
        return `
        :host {
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: minmax(auto, max-content) auto minmax(auto, max-content);
            height: 100%;
            background: white;
        }`;
    }

    template() {
        return `
        <style>${this.l2_main_default_style()}</style>
        <l2-main-nav></l2-main-nav>
        <l2-main-stage></l2-main-stage>
        <l2-main-copyright></l2-main-copyright>
        `;
    }

}
customElements.define('l2-main', l2_main)
