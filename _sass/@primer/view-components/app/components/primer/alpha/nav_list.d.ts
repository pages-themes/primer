declare class NavListElement extends HTMLElement {
    list: HTMLElement;
    showMoreItem: HTMLElement;
    focusMarkers: HTMLElement[];
    connectedCallback(): void;
    get showMoreDisabled(): boolean;
    set showMoreDisabled(value: boolean);
    set currentPage(value: number);
    get currentPage(): number;
    get totalPages(): number;
    get paginationSrc(): string;
    expandItem(item: HTMLElement): void;
    collapseItem(item: HTMLElement): void;
    itemIsExpanded(item: HTMLElement | null): boolean;
    handleItemWithSubItemClick(e: Event): void;
    private showMore;
    private setShowMoreItemState;
    private parseHTML;
}
declare global {
    interface Window {
        NavListElement: typeof NavListElement;
    }
}
export {};
