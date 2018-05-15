export class l2_world_status extends HTMLElement {
    constructor() {
        super();
        document.addEventListener('l2-world-status-mbox', this.handle_mbox_message.bind(this), true);
    }

    handle_mbox_message(event) {

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
        <svg class="world-svg" version="1.1" viewBox="0 0 1120.3 478.59" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <ellipse cx="561.33" cy="216.42" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="561.42" cy="239.46" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"
        />
        <ellipse cx="560.17" cy="272" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"
        />
        <image x="410.17" width="300" height="300" xlink:href="/images/EarthAnimation.gif" />
        <ellipse cx="560.17" cy="150" rx="139.49" ry="140.96" style="fill:none;opacity:.98;stroke-width:1.8799;stroke:#000" />
        <ellipse cx="560.17" cy="150" rx="147.34" ry="148.9" style="fill:none;opacity:.98;stroke-width:1.5144;stroke:#969696" />
        </svg>
        `;
    }

}

customElements.define('l2-world-status', l2_world_status)
