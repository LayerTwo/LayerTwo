import { l2_sections_nav_button } from "../extended-elements/l2-sections-nav-button.js"

export class l2_section_nav extends HTMLElement {
    constructor() {
        super();
        this.nav_name = this.getAttribute("section");
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.set_default_view();
    }    
    
    set_default_view(){
        if(sessionStorage.getItem(`l2-${this.nav_name}-nav`) === null){
            document.dispatchEvent(new CustomEvent('l2-nav-button-clicked', { detail: { button_name: "Status", button_section: `${this.nav_name}` }, bubble: true, composed: true }));
        }
    }

    template() {
        return `
        ${this.html_constructor()}
        `;
    }

    html_constructor() {
        return `${this.nav_selector()}`;
    }

    nav_selector() {
        switch (this.nav_name) {
            case "Personal":
                return `
                <l2-sections-nav-button section="Personal" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Personal" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="Personal" name="Finances"></l2-sections-nav-button>
                <l2-sections-nav-button section="Personal" name="Education"></l2-sections-nav-button>
                <l2-sections-nav-button section="Personal" name="Health"></l2-sections-nav-button>
                <l2-sections-nav-button section="Personal" name="Jobs"></l2-sections-nav-button>`;
                break;
            case "Social":
                return `
                <l2-sections-nav-button section="Social" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Social" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="Social" name="Friends"></l2-sections-nav-button>
                <l2-sections-nav-button section="Social" name="Channels"></l2-sections-nav-button>
                <l2-sections-nav-button section="Social" name="Interests"></l2-sections-nav-button>
                <l2-sections-nav-button section="Social" name="Views"></l2-sections-nav-button>`;
                break;
            case "Local":
                return `
                <l2-sections-nav-button section="Local" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Businesses"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Projects"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Authorities"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Goals"></l2-sections-nav-button>
                <l2-sections-nav-button section="Local" name="Problems"></l2-sections-nav-button>`;
                break;
            case "City":
                return `
                <l2-sections-nav-button section="City" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Leisure"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Businesses"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Projects"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Authorities"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Goals"></l2-sections-nav-button>
                <l2-sections-nav-button section="City" name="Problems"></l2-sections-nav-button>`;
                break;
            case "Country":
                return `
                <l2-sections-nav-button section="Country" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Economy"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Projects"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Authorities"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Goals"></l2-sections-nav-button>
                <l2-sections-nav-button section="Country" name="Problems"></l2-sections-nav-button>`;
                break;
            case "World":
                return `
                <l2-sections-nav-button section="World" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="World" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="World" name="Projects"></l2-sections-nav-button>
                <l2-sections-nav-button section="World" name="Assemblies"></l2-sections-nav-button>
                <l2-sections-nav-button section="World" name="Goals"></l2-sections-nav-button>
                <l2-sections-nav-button section="World" name="Problems"></l2-sections-nav-button>`;
                break;
            case "Space":
                return `
                <l2-sections-nav-button section="Space" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Space" name="Events"></l2-sections-nav-button>
                <l2-sections-nav-button section="Space" name="Missions"></l2-sections-nav-button>
                <l2-sections-nav-button section="Space" name="Projects"></l2-sections-nav-button>
                <l2-sections-nav-button section="Space" name="Goals"></l2-sections-nav-button>`;
                break;
            case "Visit":
                return `
                <l2-sections-nav-button section="Visit" name="Status"></l2-sections-nav-button>
                <l2-sections-nav-button section="Visit" name="Islands"></l2-sections-nav-button>
                <l2-sections-nav-button section="Visit" name="Mountains"></l2-sections-nav-button>
                <l2-sections-nav-button section="Visit" name="Historic"></l2-sections-nav-button>
                <l2-sections-nav-button section="Visit" name="Eco"></l2-sections-nav-button>`;
                break;
        }
    }

}

customElements.define("l2-section-nav", l2_section_nav)