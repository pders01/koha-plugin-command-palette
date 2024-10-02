import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { debounce } from "../lib/utilities";

@customElement("koha-command-palette")
export default class KohaCommandPalette extends LitElement {
    @property({ type: Boolean, reflect: true }) active = false;

    @state() routes: string[] = [];

    @query("#palette") palette!: HTMLDialogElement;

    @query("#palette-input") paletteInput!: HTMLInputElement;

    private debouncedHandleInput: (e: Event) => void;

    private boundHandleKeyDown = this.handleKeyDown.bind(this);

    private boundHandleKeyDownPalette = this.handleKeyDownPalette.bind(this);

    private getRoutes(query?: string) {
        const response = fetch(
            "/api/v1/contrib/commandpalette/routes" +
                (query ? `?path=${query}` : "")
        );
        response
            .then((response) => response.json())
            .then((result) => {
                this.routes = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    private handleInput() {
        const query = this.paletteInput.value;
        this.getRoutes(query);
    }

    private handleKeyDown(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (target.id === "palette-input") {
            return;
        }

        const isCmdOrCtrlPressed = e.ctrlKey || e.metaKey;
        if (isCmdOrCtrlPressed && e.key === "/") {
            e.preventDefault();
            this.palette.showModal();
            this.paletteInput.focus();
        }
    }

    private handleKeyDownPalette(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (target.id === "palette-input") {
            return;
        }
        if (e.key === "/") {
            e.preventDefault();
            this.paletteInput.focus();
        }
    }

    private handleFocusInput(e: FocusEvent) {
        const target = e.target as HTMLElement;
        if (target.id === "palette-input") {
            target.nextElementSibling?.classList.add("hidden");
        }
    }

    private handleBlurInput(e: FocusEvent) {
        const target = e.target as HTMLElement;
        if (target.id === "palette-input") {
            target.nextElementSibling?.classList.remove("hidden");
        }
    }

    constructor() {
        super();
        this.debouncedHandleInput = debounce(
            this.handleInput.bind(this),
            100,
            false
        );
    }

    override connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener("keydown", this.boundHandleKeyDown);
        this.getRoutes();
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this.boundHandleKeyDown);
    }

    protected override firstUpdated(
        _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
        super.firstUpdated(_changedProperties);
        this.palette.addEventListener(
            "keydown",
            this.boundHandleKeyDownPalette
        );
    }

    protected override createRenderRoot() {
        return this;
    }

    override render() {
        return html`
            <div id="palette" class="modal fade" tabindex="-1" aria-labelledby="paletteLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <form class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paletteLabel">Command Palette</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input
                                id="palette-input"
                                class="form-control form-control-lg mb-4"
                                type="text"
                                placeholder="Start typing..."
                                aria-label="Command Palette"
                                @input=${this.debouncedHandleInput}
                                @focus=${this.handleFocusInput}
                                @blur=${this.handleBlurInput}
                            />
                            <kbd class="position-absolute top-0 end-0 m-2">/</kbd>
                            <ul
                                id="palette-items"
                                class="list-group overflow-auto"
                                style="max-height: 24rem;"
                            >
                                ${this.routes.length
                                    ? map(
                                          this.routes,
                                          (route) => html`
                                              <li class="list-group-item my-2">
                                                  <a
                                                      href="/cgi-bin/koha${route}"
                                                      class="link"
                                                      >${route}</a
                                                  >
                                              </li>
                                          `
                                      )
                                    : html`<li class="list-group-item my-2 bg-light">
                                          No results
                                      </li>`}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}
