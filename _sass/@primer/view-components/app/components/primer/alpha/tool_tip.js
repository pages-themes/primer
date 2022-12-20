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
var _ToolTipElement_instances, _ToolTipElement_abortController, _ToolTipElement_align, _ToolTipElement_side, _ToolTipElement_allowUpdatePosition, _ToolTipElement_update, _ToolTipElement_updateControlReference, _ToolTipElement_updateDirection, _ToolTipElement_updatePosition;
import { getAnchoredPosition } from '@primer/behaviors';
const TOOLTIP_OPEN_CLASS = 'tooltip-open';
const TOOLTIP_ARROW_EDGE_OFFSET = 6;
const TOOLTIP_SR_ONLY_CLASS = 'sr-only';
const DIRECTION_CLASSES = [
    'tooltip-n',
    'tooltip-s',
    'tooltip-e',
    'tooltip-w',
    'tooltip-ne',
    'tooltip-se',
    'tooltip-nw',
    'tooltip-sw'
];
class ToolTipElement extends HTMLElement {
    constructor() {
        super(...arguments);
        _ToolTipElement_instances.add(this);
        _ToolTipElement_abortController.set(this, void 0);
        _ToolTipElement_align.set(this, 'center');
        _ToolTipElement_side.set(this, 'outside-bottom');
        _ToolTipElement_allowUpdatePosition.set(this, false);
    }
    styles() {
        return `
      :host {
        position: absolute;
        z-index: 1000000;
        padding: .5em .75em;
        font: normal normal 11px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        -webkit-font-smoothing: subpixel-antialiased;
        color: var(--color-fg-on-emphasis);
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: break-word;
        white-space: pre;
        background: var(--color-neutral-emphasis-plus);
        border-radius: 6px;
        opacity: 0;
        max-width: 250px;
        word-wrap: break-word;
        white-space: normal;
        width: max-content;
      }

      :host:before{
        position: absolute;
        z-index: 1000001;
        color: var(--color-neutral-emphasis-plus);
        content: "";
        border: 6px solid transparent;
        opacity: 0
      }

      @keyframes tooltip-appear {
        from {
          opacity: 0
        }
        to {
          opacity: 1
        }
      }

      :host:after{
        position: absolute;
        display: block;
        right: 0;
        left: 0;
        height: 12px;
        content: ""
      }

      :host(.${TOOLTIP_OPEN_CLASS}),
      :host(.${TOOLTIP_OPEN_CLASS}):before {
        animation-name: tooltip-appear;
        animation-duration: .1s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        animation-delay: .4s
      }

      :host(.tooltip-s):before,
      :host(.tooltip-n):before {
        right: 50%;
        margin-right: -${TOOLTIP_ARROW_EDGE_OFFSET}px;
      }

      :host(.tooltip-s):before,
      :host(.tooltip-se):before,
      :host(.tooltip-sw):before {
        bottom: 100%;
        border-bottom-color: var(--color-neutral-emphasis-plus)
      }

      :host(.tooltip-s):after,
      :host(.tooltip-se):after,
      :host(.tooltip-sw):after {
        bottom: 100%
      }

      :host(.tooltip-n):before,
      :host(.tooltip-ne):before,
      :host(.tooltip-nw):before {
        top: 100%;
        border-top-color: var(--color-neutral-emphasis-plus)
      }

      :host(.tooltip-n):after,
      :host(.tooltip-ne):after,
      :host(.tooltip-nw):after {
        top: 100%
      }

      :host(.tooltip-se):before,
      :host(.tooltip-ne):before {
        left: 0;
        margin-left: ${TOOLTIP_ARROW_EDGE_OFFSET}px;
      }

      :host(.tooltip-sw):before,
      :host(.tooltip-nw):before {
        right: 0;
        margin-right: ${TOOLTIP_ARROW_EDGE_OFFSET}px;
      }

      :host(.tooltip-w):before {
        top: 50%;
        bottom: 50%;
        left: 100%;
        margin-top: -6px;
        border-left-color: var(--color-neutral-emphasis-plus)
      }

      :host(.tooltip-e):before {
        top: 50%;
        right: 100%;
        bottom: 50%;
        margin-top: -6px;
        border-right-color: var(--color-neutral-emphasis-plus)
      }
    `;
    }
    get htmlFor() {
        return this.getAttribute('for') || '';
    }
    set htmlFor(value) {
        this.setAttribute('for', value);
    }
    get type() {
        const type = this.getAttribute('data-type');
        return type === 'label' ? 'label' : 'description';
    }
    set type(value) {
        this.setAttribute('data-type', value);
    }
    get direction() {
        return (this.getAttribute('data-direction') || 's');
    }
    set direction(value) {
        this.setAttribute('data-direction', value);
    }
    get control() {
        return this.ownerDocument.getElementById(this.htmlFor);
    }
    set hiddenFromView(value) {
        this.classList.toggle(TOOLTIP_SR_ONLY_CLASS, value);
        if (this.isConnected)
            __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_update).call(this);
    }
    get hiddenFromView() {
        return this.classList.contains(TOOLTIP_SR_ONLY_CLASS);
    }
    connectedCallback() {
        var _a;
        __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_updateControlReference).call(this);
        __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_updateDirection).call(this);
        if (!this.shadowRoot) {
            const shadow = this.attachShadow({ mode: 'open' });
            // eslint-disable-next-line github/no-inner-html
            shadow.innerHTML = `
        <style>
          ${this.styles()}
        </style>
        <slot></slot>
      `;
        }
        this.hiddenFromView = true;
        __classPrivateFieldSet(this, _ToolTipElement_allowUpdatePosition, true, "f");
        if (!this.id) {
            this.id = `tooltip-${Date.now()}-${(Math.random() * 10000).toFixed(0)}`;
        }
        if (!this.control)
            return;
        this.setAttribute('role', 'tooltip');
        (_a = __classPrivateFieldGet(this, _ToolTipElement_abortController, "f")) === null || _a === void 0 ? void 0 : _a.abort();
        __classPrivateFieldSet(this, _ToolTipElement_abortController, new AbortController(), "f");
        const { signal } = __classPrivateFieldGet(this, _ToolTipElement_abortController, "f");
        this.addEventListener('mouseleave', this, { signal });
        this.control.addEventListener('mouseenter', this, { signal });
        this.control.addEventListener('mouseleave', this, { signal });
        this.control.addEventListener('focus', this, { signal });
        this.control.addEventListener('blur', this, { signal });
        this.ownerDocument.addEventListener('keydown', this, { signal });
        __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_update).call(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = __classPrivateFieldGet(this, _ToolTipElement_abortController, "f")) === null || _a === void 0 ? void 0 : _a.abort();
    }
    handleEvent(event) {
        if (!this.control)
            return;
        // Ensures that tooltip stays open when hovering between tooltip and element
        // WCAG Success Criterion 1.4.13 Hoverable
        if ((event.type === 'mouseenter' || event.type === 'focus') && this.hiddenFromView) {
            this.hiddenFromView = false;
        }
        else if (event.type === 'blur') {
            this.hiddenFromView = true;
        }
        else if (event.type === 'mouseleave' &&
            event.relatedTarget !== this.control &&
            event.relatedTarget !== this) {
            this.hiddenFromView = true;
        }
        else if (event.type === 'keydown' && event.key === 'Escape' && !this.hiddenFromView) {
            this.hiddenFromView = true;
        }
    }
    attributeChangedCallback(name) {
        if (!this.isConnected)
            return;
        if (name === 'id' || name === 'data-type') {
            __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_updateControlReference).call(this);
        }
        else if (name === 'data-direction') {
            __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_updateDirection).call(this);
        }
    }
}
_ToolTipElement_abortController = new WeakMap(), _ToolTipElement_align = new WeakMap(), _ToolTipElement_side = new WeakMap(), _ToolTipElement_allowUpdatePosition = new WeakMap(), _ToolTipElement_instances = new WeakSet(), _ToolTipElement_update = function _ToolTipElement_update() {
    if (this.hiddenFromView) {
        this.classList.remove(TOOLTIP_OPEN_CLASS, ...DIRECTION_CLASSES);
    }
    else {
        this.classList.add(TOOLTIP_OPEN_CLASS);
        for (const tooltip of this.ownerDocument.querySelectorAll(this.tagName)) {
            if (tooltip !== this)
                tooltip.hiddenFromView = true;
        }
        __classPrivateFieldGet(this, _ToolTipElement_instances, "m", _ToolTipElement_updatePosition).call(this);
    }
}, _ToolTipElement_updateControlReference = function _ToolTipElement_updateControlReference() {
    if (!this.id || !this.control)
        return;
    if (this.type === 'label') {
        let labelledBy = this.control.getAttribute('aria-labelledby');
        if (labelledBy) {
            if (!labelledBy.split(' ').includes(this.id)) {
                labelledBy = `${labelledBy} ${this.id}`;
            }
            else {
                labelledBy = `${labelledBy}`;
            }
        }
        else {
            labelledBy = this.id;
        }
        this.control.setAttribute('aria-labelledby', labelledBy);
        // Prevent duplicate accessible name announcements.
        this.setAttribute('aria-hidden', 'true');
    }
    else {
        let describedBy = this.control.getAttribute('aria-describedby');
        if (describedBy) {
            if (!describedBy.split(' ').includes(this.id)) {
                describedBy = `${describedBy} ${this.id}`;
            }
            else {
                describedBy = `${describedBy}`;
            }
        }
        else {
            describedBy = this.id;
        }
        this.control.setAttribute('aria-describedby', describedBy);
    }
}, _ToolTipElement_updateDirection = function _ToolTipElement_updateDirection() {
    this.classList.remove(...DIRECTION_CLASSES);
    const direction = this.direction;
    if (direction === 'n') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'center', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-top', "f");
    }
    else if (direction === 'ne') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'start', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-top', "f");
    }
    else if (direction === 'e') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'center', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-right', "f");
    }
    else if (direction === 'se') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'start', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-bottom', "f");
    }
    else if (direction === 's') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'center', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-bottom', "f");
    }
    else if (direction === 'sw') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'end', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-bottom', "f");
    }
    else if (direction === 'w') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'center', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-left', "f");
    }
    else if (direction === 'nw') {
        __classPrivateFieldSet(this, _ToolTipElement_align, 'end', "f");
        __classPrivateFieldSet(this, _ToolTipElement_side, 'outside-top', "f");
    }
}, _ToolTipElement_updatePosition = function _ToolTipElement_updatePosition() {
    if (!this.control)
        return;
    if (!__classPrivateFieldGet(this, _ToolTipElement_allowUpdatePosition, "f") || this.hiddenFromView)
        return;
    const TOOLTIP_OFFSET = 10;
    this.style.left = `0px`; // Ensures we have reliable tooltip width in `getAnchoredPosition`
    const position = getAnchoredPosition(this, this.control, {
        side: __classPrivateFieldGet(this, _ToolTipElement_side, "f"),
        align: __classPrivateFieldGet(this, _ToolTipElement_align, "f"),
        anchorOffset: TOOLTIP_OFFSET
    });
    const anchorSide = position.anchorSide;
    const align = position.anchorAlign;
    this.style.top = `${position.top}px`;
    this.style.left = `${position.left}px`;
    let direction = 's';
    if (anchorSide === 'outside-left') {
        direction = 'w';
    }
    else if (anchorSide === 'outside-right') {
        direction = 'e';
    }
    else if (anchorSide === 'outside-top') {
        if (align === 'center') {
            direction = 'n';
        }
        else if (align === 'start') {
            direction = 'ne';
        }
        else {
            direction = 'nw';
        }
    }
    else {
        if (align === 'center') {
            direction = 's';
        }
        else if (align === 'start') {
            direction = 'se';
        }
        else {
            direction = 'sw';
        }
    }
    this.classList.add(`tooltip-${direction}`);
};
ToolTipElement.observedAttributes = ['data-type', 'data-direction', 'id'];
if (!window.customElements.get('tool-tip')) {
    window.ToolTipElement = ToolTipElement;
    window.customElements.define('tool-tip', ToolTipElement);
}
