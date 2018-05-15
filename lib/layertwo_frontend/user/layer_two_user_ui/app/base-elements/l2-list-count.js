export class l2_list_count extends HTMLElement {
    constructor() {
        super();
        this.current_count = 0;
        this.section = this.getAttribute('section');
        this.sub_section = this.getAttribute('sub-section');
        this.view_name = this.getAttribute('view');
        document.addEventListener('list-count-mbox', this.handle_mbox_message.bind(this), true);
    }

    handle_mbox_message(event) {
        if (event.detail.view_name === this.view_name
            && event.detail.section === this.section
            && event.detail.sub_section === this.sub_section) {
            this.process_mbox_message(event);
        }
    }

    process_mbox_message(event) {
        switch (event.detail.action) {
            case 'show-count':
                this.show_count(event);
                break;
            case 'reduce-by-one':
                this.reduce_by_one(event);
                break;
        }
    }

    show_count(event) {
        this.current_count = event.detail.list.length;
        this.innerHTML = 'Current count: ' + this.current_count;
    }

    reduce_by_one() {
        this.innerHTML = 'Current count: ' + `${this.current_count - 1}`;
        this.current_count -= 1;
    }
}

customElements.define('l2-list-count', l2_list_count)