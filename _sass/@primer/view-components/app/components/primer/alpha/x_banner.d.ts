declare class XBannerElement extends HTMLElement {
    titleText: HTMLElement;
    dismiss(): void;
    private shouldReappear;
}
declare global {
    interface Window {
        XBannerElement: typeof XBannerElement;
    }
}
export {};
