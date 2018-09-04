import { l2_personal_status } from './status/l2-personal-status.js'
import { l2_social_status } from './status/l2-social-status.js'
import { l2_local_status } from './status/l2-local-status.js'
import { l2_city_status } from './status/l2-city-status.js'
import { l2_country_status } from './status/l2-country-status.js'
import { l2_world_status } from './status/l2-world-status.js'

import { l2_stage_list_and_projects } from './l2-stage-list-and-projects.js'
import { l2_stage_list_and_map } from './l2-stage-list-and-map.js'
import { l2_submit_problem_form } from './l2-submit-problem-form.js'
import { l2_submit_project_form } from './l2-submit-project-form.js'
import { l2_edit_problem_form } from './l2-edit-problem-form.js'

export class l2_view_stage extends HTMLElement {
    constructor() {
        super();
        this.section = this.getAttribute('section');
        this.view_name = this.getAttribute('sub-section');

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
        switch (`${this.section}-${this.view_name}`) {
            case 'Personal-Status':
                return `
                <l2-personal-status></l2-personal-status>`;
                break;
            case 'Social-Status':
                return `
                <l2-social-status></l2-social-status>`;
                break;
            case 'Local-Status':
                return `
                <l2-local-status></l2-local-status>`;
                break;
            case 'Local-Projects':
                return `
                <l2-stage-list-and-projects section='Local' sub-section='Projects' view='List Projects'></l2-stage-list-and-projects>
                <l2-submit-project-form section='Local' sub-section='Projects' view='Submit Project'></l2-submit-project-form>`;
                break;
            case 'Local-Problems':
                return `
                <l2-stage-list-and-map section='Local' sub-section='Problems' view='List Problems'></l2-stage-list-and-map>
                <l2-edit-problem-form section='Local' sub-section='Problems' view='Edit Problem' display='false'></l2-edit-problem-form>
                <l2-submit-problem-form section='Local' sub-section='Problems' view='Submit Problem'></l2-submit-problem-form>`;
                break;
            case 'City-Status':
                return `
                <l2-city-status></l2-city-status>`;
                break;
            case 'Country-Status':
                return `
                <l2-country-status></l2-country-status>`;
                break;
            case 'World-Status':
                return `
                <l2-world-status></l2-world-status>`;
                break;
            default:
                return ``;
        }
    }
}

customElements.define('l2-view-stage', l2_view_stage)