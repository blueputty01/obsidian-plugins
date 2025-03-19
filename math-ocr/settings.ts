import MathOCR from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { Notice } from "obsidian";

export interface MathOCRSettings {
  simpletexAPIKey: string;
  useBetterPasteId: boolean;
}

export const DEFAULT_SETTINGS: MathOCRSettings = {
  simpletexAPIKey: "",
  useBetterPasteId: false,
};

export class MathOCRSettingTab extends PluginSettingTab {
  plugin: MathOCR;

  constructor(app: App, plugin: MathOCR) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Use better loading placeholder")
      .setDesc("Use a more readable placeholder when processing an image")
      .addToggle((val) =>
        val
          .setValue(this.plugin.settings.useBetterPasteId)
          .onChange(async (value) => {
            console.log(value);
            this.plugin.settings.useBetterPasteId = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("SimpleTex API key")
      .setDesc(
        "API key for the SimpleTex service. Get one at https://simpletex.net/api",
      )
      .addText((text) =>
        text
          .setValue(this.plugin.settings.simpletexAPIKey || "")
          .onChange(async (value) => {
            const trimmedValue = value.trim();
            this.plugin.settings.simpletexAPIKey = trimmedValue;
            await this.plugin.saveSettings();
          }),
      );
  }
}
