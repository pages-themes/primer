var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { controller, target } from '@github/catalyst';
let XBannerElement = class XBannerElement extends HTMLElement {
    dismiss() {
        if (this.shouldReappear()) {
            this.style.setProperty('visibility', 'hidden');
            setTimeout(() => {
                this.style.setProperty('visibility', 'visible');
            }, 2000);
            return;
        }
        const parentElement = this.parentElement;
        if (!parentElement)
            return;
        parentElement.removeChild(this);
    }
    shouldReappear() {
        return this.getAttribute('data-reappear') === 'true';
    }
};
__decorate([
    target
], XBannerElement.prototype, "titleText", void 0);
XBannerElement = __decorate([
    controller
], XBannerElement);
if (!window.customElements.get('x-banner')) {
    window.XBannerElement = XBannerElement;
    window.customElements.define('x-banner', XBannerElement);
}
