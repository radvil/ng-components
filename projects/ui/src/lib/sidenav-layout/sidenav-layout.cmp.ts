import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { LetModule } from "@ngrx/component";
import {
  FaAlienMonster,
  FaAngleDoubleRight,
  FaCat,
  FaMoonStars,
  FaSpaceShuttle,
  FaSpaceStationMoonAlt,
  FaSun,
  FaSunGlasses,
} from "../fa-icons";
import { LayoutService } from "./layout.service";

@Component({
  standalone: true,
  selector: "ui-sidenav-layout",
  templateUrl: "sidenav-layout.cmp.html",
  styleUrls: ["sidenav-layout.cmp.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    LetModule,
    FaAlienMonster,
    FaAngleDoubleRight,
    FaCat,
    FaMoonStars,
    FaSpaceShuttle,
    FaSpaceStationMoonAlt,
    FaSunGlasses,
    FaSun,
  ],
})
export class UiSidenavLayoutCmp implements AfterViewInit {
  @ViewChild("sidenav", { static: true })
  readonly sidenav?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.layoutService.registerSidenavRef(this.sidenav);
  }

  constructor(readonly layoutService: LayoutService) { }
}
