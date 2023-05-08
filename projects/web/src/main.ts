import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { WebRoot } from "./app/app.cmp";

bootstrapApplication(WebRoot, appConfig).catch((err) => console.error(err));
