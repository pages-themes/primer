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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PrimerTextFieldElement_abortController;
import '@github/auto-check-element';
import { controller, target } from '@github/catalyst';
let PrimerTextFieldElement = class PrimerTextFieldElement extends HTMLElement {
    constructor() {
        super(...arguments);
        _PrimerTextFieldElement_abortController.set(this, void 0);
    }
    connectedCallback() {
        var _a;
        (_a = __classPrivateFieldGet(this, _PrimerTextFieldElement_abortController, "f")) === null || _a === void 0 ? void 0 : _a.abort();
        const { signal } = (__classPrivateFieldSet(this, _PrimerTextFieldElement_abortController, new AbortController(), "f"));
        this.inputElement.addEventListener('auto-check-success', () => { this.clearError(); }, { signal });
        this.inputElement.addEventListener('auto-check-error', (event) => {
            event.detail.response.text().then((error_message) => { this.setError(error_message); });
        }, { signal });
    }
    disconnectedCallback() {
        var _a;
        (_a = __classPrivateFieldGet(this, _PrimerTextFieldElement_abortController, "f")) === null || _a === void 0 ? void 0 : _a.abort();
    }
    clearError() {
        this.inputElement.removeAttribute('invalid');
        this.validationElement.hidden = true;
        this.validationMessageElement.innerText = '';
    }
    setError(message) {
        this.validationMessageElement.innerText = message;
        this.validationElement.hidden = false;
        this.inputElement.setAttribute('invalid', 'true');
    }
};
_PrimerTextFieldElement_abortController = new WeakMap();
__decorate([
    target
], PrimerTextFieldElement.prototype, "inputElement", void 0);
__decorate([
    target
], PrimerTextFieldElement.prototype, "validationElement", void 0);
__decorate([
    target
], PrimerTextFieldElement.prototype, "validationMessageElement", void 0);
PrimerTextFieldElement = __decorate([
    controller
], PrimerTextFieldElement);
