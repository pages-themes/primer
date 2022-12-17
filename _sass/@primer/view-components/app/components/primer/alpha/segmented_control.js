var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SegmentedControlElement_instances, _SegmentedControlElement_updateButtonLabels;
import { controller, targets } from '@github/catalyst';
let SegmentedControlElement = class SegmentedControlElement extends HTMLElement {
    constructor() {
        super(...arguments);
        _SegmentedControlElement_instances.add(this);
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _SegmentedControlElement_instances, "m", _SegmentedControlElement_updateButtonLabels).call(this);
    }
    select(event) {
        var _a, _b;
        const button = event.currentTarget;
        for (const item of this.items) {
            item.classList.remove('SegmentedControl-item--selected');
            (_a = item.querySelector('[aria-current]')) === null || _a === void 0 ? void 0 : _a.setAttribute('aria-current', 'false');
        }
        (_b = button.closest('li.SegmentedControl-item')) === null || _b === void 0 ? void 0 : _b.classList.add('SegmentedControl-item--selected');
        button.setAttribute('aria-current', 'true');
    }
};
_SegmentedControlElement_instances = new WeakSet(), _SegmentedControlElement_updateButtonLabels = function _SegmentedControlElement_updateButtonLabels() {
    for (const label of this.querySelectorAll('.Button-label')) {
        label.setAttribute('data-content', label.textContent || '');
    }
};
__decorate([
    targets
], SegmentedControlElement.prototype, "items", void 0);
SegmentedControlElement = __decorate([
    controller
], SegmentedControlElement);
if (!window.customElements.get('segmented-control')) {
    window.SegmentedControlElement = SegmentedControlElement;
    window.customElements.define('segmented-control', SegmentedControlElement);
}
