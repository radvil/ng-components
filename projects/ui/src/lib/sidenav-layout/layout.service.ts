import {
  ElementRef,
  Injectable,
  computed,
  effect,
  signal,
} from "@angular/core";
import { Colorscheme, LayoutState } from "./layout.interface";
import { LocalStorageService } from "@common";
import { toObservable } from "@angular/core/rxjs-interop";
import { fromEvent, tap, merge } from "rxjs";

export const layoutFeatureName = "layout";

@Injectable({ providedIn: "root" })
export class LayoutService {
  readonly availableColorSchemes: Colorscheme[] = ["dark", "light", "solar"];

  readonly #state = signal<LayoutState>({
    colorscheme: "dark",
    sidebarExpanded: true,
    asideMode: true,
  });

  get state() {
    return this.#state.asReadonly();
  }

  readonly colorscheme = computed(() => this.state().colorscheme);

  readonly asideMode = computed(() => this.state().asideMode);

  readonly aside$ = toObservable(this.asideMode);

  readonly sidebarExpanded = computed(() => this.state().sidebarExpanded);

  switchColorScheme(): void {
    this.#state.mutate((state) => {
      const index = this.availableColorSchemes.indexOf(state.colorscheme);
      const nextColorScheme = this.availableColorSchemes[index + 1];
      state.colorscheme = nextColorScheme || this.availableColorSchemes[0];
      return state;
    });
  }

  expandSidenav(): void {
    console.log("expandSidenav");
    this.#state.mutate((state) => {
      state.sidebarExpanded = true;
      return state;
    });
  }

  collapseSidenav(): void {
    this.#state.mutate((state) => {
      state.sidebarExpanded = false;
      return state;
    });
  }

  toggleSidenavExpanded(): void {
    this.#state.mutate((state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
      return state;
    });
  }

  registerSidenavRef(ref: ElementRef<HTMLElement> | undefined): void {
    if (!ref) throw new Error("sidenav ref is undefined");
    const expand$ = fromEvent(ref.nativeElement, "mouseenter").pipe(
      tap(() => {
        if (!this.asideMode()) {
          this.expandSidenav();
        }
      })
    );
    const collapse$ = fromEvent(ref.nativeElement, "mouseleave").pipe(
      tap(() => {
        if (!this.asideMode()) {
          this.collapseSidenav();
        }
      })
    );
    merge(expand$, collapse$).subscribe();
  }

  #onColorSchemeChange(): void {
    const host = document.querySelector("ui-sidenav-layout");
    if (!host) throw new Error("host not found");
    host.classList.value = this.colorscheme();
    console.warn("colorscheme changes");
  }

  #onStateChanges(): void {
    this.localStorageApi.setItem(layoutFeatureName, this.state());
    console.warn("state changes");
  }

  #loadInitialStateFromLocalStorage(): void {
    const cached = this.localStorageApi.getItem<LayoutState>(layoutFeatureName);
    if (cached) this.#state.set(cached);
  }

  constructor(private localStorageApi: LocalStorageService) {
    this.#loadInitialStateFromLocalStorage();
    effect(() => {
      this.#onColorSchemeChange();
      this.#onStateChanges();
    });
  }
}
