import { MarkdownView, Modal, Plugin, TFile, Notice } from 'obsidian';
import {
  ProtectFilesSettingTab,
  ProtectFilesSettings,
  DEFAULT_SETTINGS,
} from './settings';
import { DomUtils } from './utils';

export default class ProtectFiles extends Plugin {
  settings: ProtectFilesSettings;
  inactivityTimer: number;
  isUnlocked: boolean = false;

  async onload() {
    console.log("Loading Protect Files plugin");
    await this.loadSettings();

    this.addSettingTab(new ProtectFilesSettingTab(this.app, this));

    this.closeProtectedFiles();
    this.resetInactivityTimer();

    this.registerEvent(
      this.app.workspace.on('editor-change', () => this.resetInactivityTimer())
    );
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', () =>
        this.resetInactivityTimer()
      )
    );
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        DomUtils.setEditorVisibility(this.app, false);
        this.checkPassword(file);
      })
    );
  }

  onunload() {
    console.log("Unloading Protect Files plugin");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  closeProtectedFiles() {
    console.log("Closing protected files");
    const protectedFolderPath = this.settings.protectedFolderPath;
    if (!protectedFolderPath) {
      return;
    }

    const filesToClose = this.app.workspace
      .getLeavesOfType('markdown')
      .filter((leaf) => {
        const view = leaf.view as MarkdownView;
        if (view.file) {
          return view.file.path.startsWith(protectedFolderPath);
        }
        return false;
      });

    filesToClose.forEach((leaf) => {
      leaf.detach();
    });
  }

  resetInactivityTimer() {
    console.log("Resetting inactivity timer");
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = window.setTimeout(() => {
      this.collapseProtectedFolder();
    }, this.settings.inactivityTimeout * 60 * 1000);
  }

  collapseProtectedFolder() {
    console.log("Collapsing protected folder");
    const protectedFolderPath = this.settings.protectedFolderPath;
    if (!protectedFolderPath) {
      return;
    }

    this.isUnlocked = false;

    const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
    if (fileExplorer) {
      const folder = (fileExplorer.view as any).fileItems[protectedFolderPath];
      if (folder) {
        folder.setCollapsed(true);
      }
    }

    const filesToHide = this.app.workspace
      .getLeavesOfType('markdown')
      .filter((leaf) => {
        const view = leaf.view as MarkdownView;
        if (view.file) {
          return view.file.path.startsWith(protectedFolderPath);
        }
        return false;
      });

    filesToHide.forEach((leaf) => {
      DomUtils.setEditorVisibility(this.app, false);
    });
  }

  async checkPassword(file: TFile) {
    console.log("Checking password");
    const protectedFolderPath = this.settings.protectedFolderPath;
    if (
      !protectedFolderPath ||
      !file ||
      !file.path.startsWith(protectedFolderPath)
    ) {
      return;
    }

    if (this.isUnlocked) {
      DomUtils.setEditorVisibility(this.app, true);
      return;
    }

    this.promptForPassword();
  }

  promptForPassword() {
    const prompt = new Modal(this.app);
    prompt.contentEl.createEl('h1', { text: 'Enter Password' });
    const input = prompt.contentEl.createEl('input', { type: 'password' });
    const button = prompt.contentEl.createEl('button', { text: 'Submit' });

    const submit = () => {
      const password = input.value;
      if (password === this.settings.password_hash) {
        this.isUnlocked = true;
        DomUtils.setEditorVisibility(this.app, true);
        prompt.close();
      } else {
        new Notice("Incorrect password");
        input.value = "";
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submit();
      }
    });

    button.onclick = () => {
      submit();
    };

    prompt.open();
  }
}
