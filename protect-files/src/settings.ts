import { App, PluginSettingTab, Setting } from 'obsidian';
import ProtectFilesPlugin from './main';

export interface ProtectFilesSettings {
  password_hash: string;
  protected_folder: string;
  inactivity_timeout: number;
}

export const DEFAULT_SETTINGS: ProtectFilesSettings = {
  password_hash: '',
  protected_folder: '',
  inactivity_timeout: 5,
};

export class ProtectFilesSettingTab extends PluginSettingTab {
  plugin: ProtectFilesPlugin;

  constructor(app: App, plugin: ProtectFilesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Protect Files Settings' });

    const passwordSetting = containerEl.createDiv({ cls: 'setting-item' });
    const info = passwordSetting.createDiv({ cls: 'setting-item-info' });
    info.createDiv({ cls: 'setting-item-name', text: 'Password' });
    info.createDiv({ cls: 'setting-item-description', text: 'Set a password to protect your files.' });

    const control = passwordSetting.createDiv({ cls: 'setting-item-control' });
    const input = control.createEl('input', {
      type: 'password',
      placeholder: 'Enter new password',
    });

    input.addEventListener('change', async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value) {
        this.plugin.settings.password_hash = target.value;
        await this.plugin.saveSettings();
        target.value = '';
      }
    });

    new Setting(containerEl)
      .setName('Protected folder')
      .setDesc('Specify the folder to protect.')
      .addText((text) =>
        text
          .setPlaceholder('e.g., protected')
          .setValue(this.plugin.settings.protected_folder)
          .onChange(async (value) => {
            this.plugin.settings.protected_folder = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Inactivity timeout (minutes)')
      .setDesc('The file will be locked after this period of inactivity.')
      .addText((text) =>
        text
          .setValue(String(this.plugin.settings.inactivity_timeout))
          .onChange(async (value) => {
            const timeout = Number(value);
            if (!isNaN(timeout) && timeout > 0) {
              this.plugin.settings.inactivity_timeout = timeout;
              await this.plugin.saveSettings();
            }
          })
      );
  }
}