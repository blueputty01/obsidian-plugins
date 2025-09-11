import { Plugin, TFile, WorkspaceLeaf, MarkdownView, Notice } from 'obsidian';
import {
  ProtectFilesSettingTab,
  ProtectFilesSettings,
  DEFAULT_SETTINGS,
} from './settings';
import { DomUtils } from './utils';
import { PasswordModal } from './PasswordModal';

export default class ProtectFilesPlugin extends Plugin {
  settings: ProtectFilesSettings;

  private isLocked: boolean = false;
  private inactivityTimer: number | null = null;

  async onload() {
    console.log('Loading Protect Files plugin');
    await this.loadSettings();
    this.addSettingTab(new ProtectFilesSettingTab(this.app, this));

    this.app.workspace.on('file-open', this.handleFileOpen);
    this.app.workspace.on('active-leaf-change', this.handleActiveLeafChange);

    this.registerDomEvent(document, 'keydown', this.handleUserActivity);
    this.registerDomEvent(document, 'mousemove', this.handleUserActivity);
  }

  onunload() {
    console.log('Unloading Protect Files plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  private handleFileOpen = (file: TFile) => {
    if (this.isProtected(file)) {
      this.lockFile();
    }
  };

  private handleActiveLeafChange = (leaf: WorkspaceLeaf) => {
    if (leaf && leaf.view instanceof MarkdownView) {
      const file = leaf.view.file;
      if (this.isProtected(file)) {
        this.lockFile();
      } else {
        this.unlockFile();
      }
    }
  };

  private isProtected(file: TFile) {
    if (!file || !this.settings.protected_folder) {
      return false;
    }
    return file.path.startsWith(this.settings.protected_folder);
  }

  private lockFile() {
    if (this.isLocked) return;
    this.isLocked = true;
    
    // DomUtils.setEditorVisibility(this.app, false);
    // this.promptForPassword();
  }

  private unlockFile() {
    if (!this.isLocked) return;
    this.isLocked = false;
    // DomUtils.setEditorVisibility(this.app, true);
    this.resetInactivityTimer();
  }

  private promptForPassword() {
    new PasswordModal(
      this.app,
      this.settings.password_hash,
          this.unlockFile
    ).open();
  }

  private resetInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    this.inactivityTimer = window.setTimeout(() => {
      this.lockFile();
    }, this.settings.inactivity_timeout * 60 * 1000);
  }

  private handleUserActivity = () => {
    if (!this.isLocked) {
      this.resetInactivityTimer();
    }
  };

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
