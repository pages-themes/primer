import '@github/clipboard-copy-element';
const CLIPBOARD_COPY_TIMER_DURATION = 2000;
function showSVG(svg) {
    svg.style.display = 'inline-block';
}
function hideSVG(svg) {
    svg.style.display = 'none';
}
// Toggle a copy button.
function showCopy(button) {
    const [copyIcon, checkIcon] = button.querySelectorAll('.octicon');
    if (!copyIcon || !checkIcon)
        return;
    showSVG(copyIcon);
    hideSVG(checkIcon);
}
// Toggle a copy button.
function showCheck(button) {
    const [copyIcon, checkIcon] = button.querySelectorAll('.octicon');
    if (!copyIcon || !checkIcon)
        return;
    hideSVG(copyIcon);
    showSVG(checkIcon);
}
const clipboardCopyElementTimers = new WeakMap();
document.addEventListener('clipboard-copy', ({ target }) => {
    if (!(target instanceof HTMLElement))
        return;
    if (!target.hasAttribute('data-view-component'))
        return;
    const currentTimeout = clipboardCopyElementTimers.get(target);
    if (currentTimeout) {
        clearTimeout(currentTimeout);
        clipboardCopyElementTimers.delete(target);
    }
    else {
        showCheck(target);
    }
    clipboardCopyElementTimers.set(target, setTimeout(() => {
        showCopy(target);
        clipboardCopyElementTimers.delete(target);
    }, CLIPBOARD_COPY_TIMER_DURATION));
});
