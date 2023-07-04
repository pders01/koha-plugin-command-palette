import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { debounce } from "../lib/utilities";
import { tailwindStyles } from "../tailwind.lit";

@customElement("koha-command-palette")
export default class KohaCommandPalette extends LitElement {
    @property({ type: Boolean, reflect: true }) active = false;

    @state() routes: string[] = [];

    @query("#palette") palette!: HTMLDialogElement;

    @query("#palette-input") paletteInput!: HTMLInputElement;

    private debouncedHandleInput: (e: Event) => void;

    private boundHandleKeyDown = this.handleKeyDown.bind(this);

    private boundHandleKeyDownPalette = this.handleKeyDownPalette.bind(this);

    static override styles = [tailwindStyles];

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
        if (e.key.toLowerCase() === "p" && e.ctrlKey && e.shiftKey) {
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

    override render() {
        return html`
            <dialog id="palette" class="modal">
                <form class="modal-box w-2/3 max-w-5xl">
                    <input
                        id="palette-input"
                        class="input-bordered input input-lg mb-4 w-full"
                        type="text"
                        placeholder="Start typing..."
                        aria-label="Command Palette"
                        @input=${this.debouncedHandleInput}
                        @focus=${this.handleFocusInput}
                        @blur=${this.handleBlurInput}
                    />
                    <!-- kbd inside the input, vanishes when focused -->
                    <kbd class="kbd absolute right-8 top-6 m-2">/</kbd>
                    <ul
                        id="palette-items"
                        class="max-h-[24rem] overflow-y-scroll rounded-xl"
                    >
                        ${this.routes.length
                            ? map(
                                  this.routes,
                                  (route) => html`
                                      <li class="my-2 rounded-xl p-4">
                                          <a
                                              href="/cgi-bin/koha${route}"
                                              class="link"
                                              >${route}</a
                                          >
                                      </li>
                                  `
                              )
                            : html`<li class="my-2 rounded-xl bg-base-200 p-2">
                                  No results
                              </li>`}
                    </ul>
                </form>
            </dialog>
        `;
    }
}
