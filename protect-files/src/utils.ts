import { App, MarkdownView } from "obsidian";

export class DomUtils {
  public static setEditorVisibility(app: App, visible: boolean) {
    const activeView = app.workspace.getActiveViewOfType(MarkdownView);
    if (activeView) {
      let overlay = activeView.contentEl.querySelector(".protection-overlay") as HTMLElement;
      if (visible) {
        if (overlay) {
          overlay.remove();
        }
        activeView.contentEl.style.visibility = "visible";
      } else {
        if (!overlay) {
          overlay = document.createElement("div");
          overlay.className = "protection-overlay";
          overlay.style.position = "absolute";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = "var(--background-primary)";
          overlay.style.zIndex = "1";
          overlay.style.display = "flex";
          overlay.style.justifyContent = "center";
          overlay.style.alignItems = "center";
          overlay.innerText = "Content Hidden";
          activeView.contentEl.appendChild(overlay);
        }
        activeView.contentEl.style.visibility = "hidden";
      }
    }
  }
}