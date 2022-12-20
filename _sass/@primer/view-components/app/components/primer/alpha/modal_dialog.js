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
var _ModalDialogElement_instances, _ModalDialogElement_focusAbortController, _ModalDialogElement_overlayBackdrop_get, _ModalDialogElement_keydown;
import { focusTrap } from '@primer/behaviors';
import { getFocusableChild } from '@primer/behaviors/utils';
function focusIfNeeded(elem) {
    if (document.activeElement !== elem) {
        elem === null || elem === void 0 ? void 0 : elem.focus();
    }
}
const overlayStack = [];
function clickHandler(event) {
    const target = event.target;
    const button = target === null || target === void 0 ? void 0 : target.closest('button');
    // If the user is clicking a valid dialog trigger
    let dialogId = button === null || button === void 0 ? void 0 : button.getAttribute('data-show-dialog-id');
    if (button && dialogId) {
        event.stopPropagation();
        const dialog = document.getElementById(dialogId);
        if (dialog instanceof ModalDialogElement) {
            dialog.openButton = button;
            dialog.show();
            return;
        }
    }
    // Find the top level dialog that is open.
    const topLevelDialog = overlayStack[overlayStack.length - 1];
    if (!topLevelDialog)
        return;
    // Check if the click happened outside the boundary of the top level dialog
    const clickOutsideDialog = !target.closest(`#${topLevelDialog.getAttribute('id')}`);
    // Only close dialog if it's a click outside the dialog and the dialog has a
    // button?
    if (!button) {
        if (clickOutsideDialog) {
            overlayStack.pop();
            topLevelDialog.close();
        }
        return;
    }
    dialogId = button.getAttribute('data-close-dialog-id');
    if (dialogId === topLevelDialog.id) {
        overlayStack.pop();
        topLevelDialog.close();
    }
    dialogId = button.getAttribute('data-submit-dialog-id');
    if (dialogId === topLevelDialog.id) {
        overlayStack.pop();
        topLevelDialog.close(true);
    }
}
export class ModalDialogElement extends HTMLElement {
    constructor() {
        super(...arguments);
        _ModalDialogElement_instances.add(this);
        //TODO: Do we remove the abortController from focusTrap?
        _ModalDialogElement_focusAbortController.set(this, new AbortController());
    }
    get open() {
        return this.hasAttribute('open');
    }
    set open(value) {
        var _a, _b, _c, _d;
        if (value) {
            if (this.open)
                return;
            this.setAttribute('open', '');
            (_a = __classPrivateFieldGet(this, _ModalDialogElement_instances, "a", _ModalDialogElement_overlayBackdrop_get)) === null || _a === void 0 ? void 0 : _a.classList.remove('Overlay--hidden');
            document.body.style.overflow = 'hidden';
            if (__classPrivateFieldGet(this, _ModalDialogElement_focusAbortController, "f").signal.aborted) {
                __classPrivateFieldSet(this, _ModalDialogElement_focusAbortController, new AbortController(), "f");
            }
            focusTrap(this, undefined, __classPrivateFieldGet(this, _ModalDialogElement_focusAbortController, "f").signal);
            overlayStack.push(this);
        }
        else {
            if (!this.open)
                return;
            this.removeAttribute('open');
            (_b = __classPrivateFieldGet(this, _ModalDialogElement_instances, "a", _ModalDialogElement_overlayBackdrop_get)) === null || _b === void 0 ? void 0 : _b.classList.add('Overlay--hidden');
            document.body.style.overflow = 'initial';
            __classPrivateFieldGet(this, _ModalDialogElement_focusAbortController, "f").abort();
            // if #openButton is a child of a menu, we need to focus a suitable child of the menu
            // element since it is expected for the menu to close on click
            const menu = ((_c = this.openButton) === null || _c === void 0 ? void 0 : _c.closest('details')) || ((_d = this.openButton) === null || _d === void 0 ? void 0 : _d.closest('action-menu'));
            if (menu) {
                focusIfNeeded(getFocusableChild(menu));
            }
            else {
                focusIfNeeded(this.openButton);
            }
            this.openButton = null;
        }
    }
    get showButtons() {
        // Dialogs may also be opened from any arbitrary button with a matching show-dialog-id data attribute
        return document.querySelectorAll(`button[data-show-dialog-id='${this.id}']`);
    }
    connectedCallback() {
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'dialog');
        document.addEventListener('click', clickHandler);
        this.addEventListener('keydown', e => __classPrivateFieldGet(this, _ModalDialogElement_instances, "m", _ModalDialogElement_keydown).call(this, e));
    }
    show() {
        this.open = true;
    }
    close(closedNotCancelled = false) {
        if (this.open === false)
            return;
        const eventType = closedNotCancelled ? 'close' : 'cancel';
        const dialogEvent = new Event(eventType);
        this.dispatchEvent(dialogEvent);
        this.open = false;
    }
}
_ModalDialogElement_focusAbortController = new WeakMap(), _ModalDialogElement_instances = new WeakSet(), _ModalDialogElement_overlayBackdrop_get = function _ModalDialogElement_overlayBackdrop_get() {
    var _a;
    if ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.hasAttribute('data-modal-dialog-overlay')) {
        return this.parentElement;
    }
    return null;
}, _ModalDialogElement_keydown = function _ModalDialogElement_keydown(event) {
    if (!(event instanceof KeyboardEvent))
        return;
    if (event.isComposing)
        return;
    switch (event.key) {
        case 'Escape':
            if (this.open) {
                this.close();
                event.preventDefault();
                event.stopPropagation();
            }
            break;
    }
};
if (!window.customElements.get('modal-dialog')) {
    window.ModalDialogElement = ModalDialogElement;
    window.customElements.define('modal-dialog', ModalDialogElement);
}
