import { l2_section_main } from "./l2-section-main.js"

export class l2_main_stage extends HTMLElement {
    constructor() {
        super();
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
        return `
        <l2-section-main section="Personal"></l2-section-main>
        <l2-section-main section="Social"></l2-section-main>
        <l2-section-main section="Local"></l2-section-main>
        <l2-section-main section="City"></l2-section-main>
        <l2-section-main section="Country"></l2-section-main>
        <l2-section-main section="World"></l2-section-main>
        <l2-section-main section="Space"></l2-section-main>
        <l2-section-main section="Visit"></l2-section-main>
        `;
    }

}
customElements.define('l2-main-stage', l2_main_stage)
