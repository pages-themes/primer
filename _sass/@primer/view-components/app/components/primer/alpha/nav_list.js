var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable custom-elements/expose-class-on-global */
import { controller, target, targets } from '@github/catalyst';
let NavListElement = class NavListElement extends HTMLElement {
    connectedCallback() {
        this.setShowMoreItemState();
    }
    get showMoreDisabled() {
        return this.showMoreItem.hasAttribute('aria-disabled');
    }
    set showMoreDisabled(value) {
        if (value) {
            this.showMoreItem.setAttribute('aria-disabled', 'true');
        }
        else {
            this.showMoreItem.removeAttribute('aria-disabled');
        }
        this.showMoreItem.classList.toggle('disabled', value);
    }
    set currentPage(value) {
        this.showMoreItem.setAttribute('data-current-page', value.toString());
    }
    get currentPage() {
        return parseInt(this.showMoreItem.getAttribute('data-current-page')) || 1;
    }
    get totalPages() {
        return parseInt(this.showMoreItem.getAttribute('data-total-pages')) || 1;
    }
    get paginationSrc() {
        return this.showMoreItem.getAttribute('src') || '';
    }
    // expand collapsible item onClick
    expandItem(item) {
        var _a;
        (_a = item.nextElementSibling) === null || _a === void 0 ? void 0 : _a.removeAttribute('data-hidden');
        item.setAttribute('aria-expanded', 'true');
    }
    collapseItem(item) {
        var _a;
        (_a = item.nextElementSibling) === null || _a === void 0 ? void 0 : _a.setAttribute('data-hidden', '');
        item.setAttribute('aria-expanded', 'false');
    }
    itemIsExpanded(item) {
        if ((item === null || item === void 0 ? void 0 : item.tagName) === 'A') {
            return true;
        }
        return (item === null || item === void 0 ? void 0 : item.getAttribute('aria-expanded')) === 'true';
    }
    // expand/collapse item
    handleItemWithSubItemClick(e) {
        const el = e.target;
        if (!(el instanceof HTMLElement))
            return;
        const button = el.closest('button');
        if (!button)
            return;
        if (this.itemIsExpanded(button)) {
            this.collapseItem(button);
        }
        else {
            this.expandItem(button);
        }
        e.stopPropagation();
    }
    async showMore(e) {
        var _a, _b;
        e.preventDefault();
        if (this.showMoreDisabled)
            return;
        this.showMoreDisabled = true;
        let html;
        try {
            const paginationURL = new URL(this.paginationSrc, window.location.origin);
            this.currentPage++;
            paginationURL.searchParams.append('page', this.currentPage.toString());
            const response = await fetch(paginationURL);
            if (!response.ok)
                return;
            html = await response.text();
            if (this.currentPage === this.totalPages) {
                this.showMoreItem.hidden = true;
            }
        }
        catch (err) {
            // Ignore network errors
            this.showMoreDisabled = false;
            this.currentPage--;
            return;
        }
        const fragment = this.parseHTML(document, html);
        (_a = fragment === null || fragment === void 0 ? void 0 : fragment.querySelector('li > a')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-targets', 'nav-list.focusMarkers');
        this.list.insertBefore(fragment, this.showMoreItem);
        (_b = this.focusMarkers.pop()) === null || _b === void 0 ? void 0 : _b.focus();
        this.showMoreDisabled = false;
    }
    setShowMoreItemState() {
        if (!this.showMoreItem) {
            return;
        }
        if (this.currentPage < this.totalPages) {
            this.showMoreItem.hidden = false;
        }
        else {
            this.showMoreItem.hidden = true;
        }
    }
    parseHTML(document, html) {
        const template = document.createElement('template');
        // eslint-disable-next-line github/no-inner-html
        template.innerHTML = html;
        return document.importNode(template.content, true);
    }
};
__decorate([
    target
], NavListElement.prototype, "list", void 0);
__decorate([
    target
], NavListElement.prototype, "showMoreItem", void 0);
__decorate([
    targets
], NavListElement.prototype, "focusMarkers", void 0);
NavListElement = __decorate([
    controller
], NavListElement);
