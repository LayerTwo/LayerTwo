import { l2_view_main } from "./l2-view-main.js"

export class l2_section_stage extends HTMLElement {
    constructor() {
        super();
        this.stage_name = this.getAttribute("section");
    }

    connectedCallback() {
        this.innerHTML = this.template();
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `${this.stage_selector()}`;
    }

    stage_selector() {
        switch (this.stage_name) {
            case "Personal":
                return `
                <l2-view-main section="Personal" name="Status"></l2-view-main>
                <l2-view-main section="Personal" name="Events"></l2-view-main>
                <l2-view-main section="Personal" name="Finances"></l2-view-main>
                <l2-view-main section="Personal" name="Education"></l2-view-main>
                <l2-view-main section="Personal" name="Health"></l2-view-main>
                <l2-view-main section="Personal" name="Jobs"></l2-view-main>`;
                break;
            case "Social":
                return `
                <l2-view-main section="Social" name="Status"></l2-view-main>
                <l2-view-main section="Social" name="Events"></l2-view-main>
                <l2-view-main section="Social" name="Friends"></l2-view-main>
                <l2-view-main section="Social" name="Channels"></l2-view-main>
                <l2-view-main section="Social" name="Interests"></l2-view-main>
                <l2-view-main section="Social" name="Views"></l2-view-main>`;
                break;
            case "Local":
                return `
                <l2-view-main section="Local" name="Status"></l2-view-main>
                <l2-view-main section="Local" name="Events"></l2-view-main>
                <l2-view-main section="Local" name="Businesses"></l2-view-main>
                <l2-view-main section="Local" name="Projects"></l2-view-main>
                <l2-view-main section="Local" name="Authorities"></l2-view-main>
                <l2-view-main section="Local" name="Goals"></l2-view-main>
                <l2-view-main section="Local" name="Problems"></l2-view-main>`;
                break;
            case "City":
                return `
                <l2-view-main section="City" name="Status"></l2-view-main>
                <l2-view-main section="City" name="Events"></l2-view-main>
                <l2-view-main section="City" name="Leisure"></l2-view-main>
                <l2-view-main section="City" name="Businesses"></l2-view-main>
                <l2-view-main section="City" name="Projects"></l2-view-main>
                <l2-view-main section="City" name="Authorities"></l2-view-main>
                <l2-view-main section="City" name="Goals"></l2-view-main>
                <l2-view-main section="City" name="Problems"></l2-view-main>`;
                break;
            case "Country":
                return `
                <l2-view-main section="Country" name="Status"></l2-view-main>
                <l2-view-main section="Country" name="Events"></l2-view-main>
                <l2-view-main section="Country" name="economy"></l2-view-main>
                <l2-view-main section="Country" name="Projects"></l2-view-main>
                <l2-view-main section="Country" name="Authorities"></l2-view-main>
                <l2-view-main section="Country" name="Goals"></l2-view-main>
                <l2-view-main section="Country" name="Problems"></l2-view-main>`;
                break;
            case "World":
                return `
                <l2-view-main section="World" name="Status"></l2-view-main>
                <l2-view-main section="World" name="Events"></l2-view-main>
                <l2-view-main section="World" name="Projects"></l2-view-main>
                <l2-view-main section="World" name="Assemblies"></l2-view-main>
                <l2-view-main section="World" name="Goals"></l2-view-main>
                <l2-view-main section="World" name="Problems"></l2-view-main>`;
                break;
            case "Space":
                return `
                <l2-view-main section="Space" name="Status"></l2-view-main>
                <l2-view-main section="Space" name="Events"></l2-view-main>
                <l2-view-main section="Space" name="Missions"></l2-view-main>
                <l2-view-main section="Space" name="Projects"></l2-view-main>
                <l2-view-main section="Space" name="Goals"></l2-view-main>`;
                break;
            case "Visit":
                return `
                <l2-view-main section="Visit" name="Status"></l2-view-main>
                <l2-view-main section="Visit" name="Islands"></l2-view-main>
                <l2-view-main section="Visit" name="Mountains"></l2-view-main>
                <l2-view-main section="Visit" name="Historic"></l2-view-main>
                <l2-view-main section="Visit" name="Eco"></l2-view-main>`;
                break;
        }
    }

}

customElements.define("l2-section-stage", l2_section_stage)