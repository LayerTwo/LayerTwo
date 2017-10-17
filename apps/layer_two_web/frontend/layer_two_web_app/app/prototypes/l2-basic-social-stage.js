export class l2_basic_social_stage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template();
    }

    l2_basic_social_stage_style_show(){
        return `
        :host {
            display: flex;
            height: 100%;
            width: 100%;
            background: white;
        }
        
        svg {
            height: 100%;
            width: 100%;
        }`;
    }

    template() {
        return `
        <style>${this.l2_basic_social_stage_style_show()}</style>
        <svg id="social_stage_svg" version="1.1" viewBox="0 0 1120.3 544.39" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="560.17" cy="282.22" rx="275.82" ry="93.36" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="560.17" cy="305.26" rx="398.64" ry="150.24" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#969696"/>
        <ellipse cx="560.17" cy="337.8" rx="558.67" ry="205.09" style="fill:none;opacity:.98;stroke-dasharray:3, 3;stroke-width:3;stroke:#989898"/>
        <path d="m581.79 8.9459c8.2862 7.7249 10.728 15.484 9.2413 24.963-1.4864 9.4795-3.1573 20.674-5.3153 30.938-3.9278 5.8042-6.8231 9.957-11.98 17.163v12.398c14.324 5.6858 27.487 12.882 43.084 22.679l27.993 37.02c1.3516 7.8798-3.3442 18.193-17.518 17.459l-20.02-26.736c-15.578 17.538-14.71 39.801-14.942 67.009l1.9359 16.578 13.175 69.383c-8.0878 12.577-29.823 11.055-38.772 4.0518l-5.0392-28.198c-0.56793-2.3783-0.97097-4.7426-3.4677-4.93-2.4967 0.1874-2.8998 2.5517-3.4677 4.93l-5.0392 28.198c-8.9489 7.0034-30.684 8.5247-38.772-4.0518l13.175-69.383 1.9359-16.578c-0.232-27.208 0.636-49.471-14.942-67.009l-20.02 26.736c-14.174 0.734-18.87-9.5792-17.518-17.459l27.993-37.02c15.597-9.797 28.76-16.993 43.084-22.679v-12.398c-5.1569-7.206-8.0522-11.359-11.98-17.163-2.158-10.264-3.8289-21.458-5.3153-30.938-1.4867-9.479 0.9551-17.238 9.2413-24.963 8.286-7.7249 21.625-7.8864 21.625-7.8864s13.339 0.16149 21.625 7.8864z" style="fill:#fff;stroke-width:2.1189;stroke:#000"/>
        </svg>`;
    }

}
customElements.define('l2-basic-social-stage', l2_basic_social_stage)