import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  getItem<T = any>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  setItem<T = any>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
