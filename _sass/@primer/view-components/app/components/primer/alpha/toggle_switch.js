var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { controller, target } from '@github/catalyst';
import { debounce } from '@github/mini-throttle/decorators';
let ToggleSwitchElement = class ToggleSwitchElement extends HTMLElement {
    get src() {
        const src = this.getAttribute('src');
        if (!src)
            return null;
        const link = this.ownerDocument.createElement('a');
        link.href = src;
        return link.href;
    }
    get csrf() {
        const csrfElement = this.querySelector('[data-csrf]');
        return this.getAttribute('csrf') || (csrfElement instanceof HTMLInputElement && csrfElement.value) || null;
    }
    get csrfField() {
        // the authenticity token is passed into the element and is not generated in js land
        return this.getAttribute('csrf-field') || 'authenticity_token';
    }
    isRemote() {
        return this.src != null;
    }
    toggle() {
        if (this.isDisabled()) {
            return;
        }
        if (this.isRemote()) {
            this.setLoadingState();
            this.submitForm();
        }
        else {
            this.performToggle();
        }
    }
    turnOn() {
        if (this.isDisabled()) {
            return;
        }
        this.switch.setAttribute('aria-checked', 'true');
        this.classList.add('ToggleSwitch--checked');
    }
    turnOff() {
        if (this.isDisabled()) {
            return;
        }
        this.switch.setAttribute('aria-checked', 'false');
        this.classList.remove('ToggleSwitch--checked');
    }
    isOn() {
        return this.switch.getAttribute('aria-checked') === 'true';
    }
    isOff() {
        return !this.isOn();
    }
    isDisabled() {
        return this.switch.getAttribute('aria-disabled') === 'true';
    }
    disable() {
        this.switch.setAttribute('aria-disabled', 'true');
    }
    enable() {
        this.switch.setAttribute('aria-disabled', 'false');
    }
    performToggle() {
        if (this.isOn()) {
            this.turnOff();
        }
        else {
            this.turnOn();
        }
    }
    setLoadingState() {
        this.disable();
        this.errorIcon.setAttribute('hidden', 'hidden');
        this.loadingSpinner.removeAttribute('hidden');
    }
    setSuccessState() {
        this.setFinishedState(false);
    }
    setErrorState() {
        this.setFinishedState(true);
    }
    setFinishedState(error) {
        if (error) {
            this.errorIcon.removeAttribute('hidden');
        }
        this.loadingSpinner.setAttribute('hidden', 'hidden');
        this.enable();
    }
    async submitForm() {
        const body = new FormData();
        if (this.csrf) {
            body.append(this.csrfField, this.csrf);
        }
        body.append('value', this.isOn() ? '0' : '1');
        try {
            if (!this.src)
                throw new Error('invalid src');
            const response = await fetch(this.src, {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Requested-With': 'XMLHttpRequest'
                },
                body
            });
            if (response.ok) {
                this.setSuccessState();
                this.performToggle();
            }
            else {
                this.setErrorState();
            }
        }
        catch (error) {
            this.setErrorState();
        }
    }
};
__decorate([
    target
], ToggleSwitchElement.prototype, "switch", void 0);
__decorate([
    target
], ToggleSwitchElement.prototype, "loadingSpinner", void 0);
__decorate([
    target
], ToggleSwitchElement.prototype, "errorIcon", void 0);
__decorate([
    debounce(300)
], ToggleSwitchElement.prototype, "submitForm", null);
ToggleSwitchElement = __decorate([
    controller
], ToggleSwitchElement);
if (!window.customElements.get('toggle-switch')) {
    window.ToggleSwitchElement = ToggleSwitchElement;
    window.customElements.define('toggle-switch', ToggleSwitchElement);
}
