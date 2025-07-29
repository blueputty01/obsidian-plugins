import { App, PluginSettingTab, Setting } from 'obsidian';
import ProtectFiles from './main';

export interface ProtectFilesSettings {
  protectedFolderPath: string;
  inactivityTimeout: number;
  password_hash: string;
}

export const DEFAULT_SETTINGS: ProtectFilesSettings = {
  protectedFolderPath: '',
  inactivityTimeout: 5,
  password_hash: '',
};

export class ProtectFilesSettingTab extends PluginSettingTab {
  plugin: ProtectFiles;

  constructor(app: App, plugin: ProtectFiles) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Protected Folder Path')
      .setDesc('The path to the folder you want to protect.')
      .addText((text: any) =>
        text
          .setPlaceholder('Enter folder path')
          .setValue(this.plugin.settings.protectedFolderPath)
          .onChange(async (value: string) => {
            this.plugin.settings.protectedFolderPath = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Inactivity Timeout (minutes)')
      .setDesc(
        'The number of minutes of inactivity before the protected folder is hidden'
      )
      .addText((text: any) =>
        text
          .setPlaceholder('Enter timeout in minutes')
          .setValue(this.plugin.settings.inactivityTimeout.toString())
          .onChange(async (value: string) => {
            this.plugin.settings.inactivityTimeout = parseInt(value);
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Password')
      .setDesc('The password to access the protected files.')
      .addText((text: any) =>
        text
          .setPlaceholder('Enter password')
          .onChange(async (value: string) => {
            this.plugin.settings.password_hash = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
