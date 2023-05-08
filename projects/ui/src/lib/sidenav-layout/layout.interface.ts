export type Colorscheme = "dark" | "light" | "solar";

export interface LayoutState {
  colorscheme: Colorscheme;
  asideMode: boolean;
  sidebarExpanded: boolean;
}
