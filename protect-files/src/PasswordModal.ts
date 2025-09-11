import { App, Modal, Notice } from 'obsidian';

export class PasswordModal extends Modal {
  private password: string;
  private onSubmit: Function;
  private inputEl: HTMLInputElement;

  constructor(app: App, password: string, onSubmit: Function) {
    super(app);
    this.password = password;
    this.onSubmit = onSubmit;
  }

  private validatePassword(): void {
    if (this.inputEl.value === this.password) {
      this.onSubmit();
      this.close();
    } else {
      new Notice('Incorrect password');
    }
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Enter Password' });

    this.inputEl = contentEl.createEl('input', {
      type: 'password',
      placeholder: 'Enter password',
    });
    this.inputEl.style.width = '100%';
    this.inputEl.style.marginBottom = '1em';

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.validatePassword();
      }
    });

    const button = contentEl.createEl('button', {
      text: 'Unlock',
      cls: 'mod-cta',
    });

    button.addEventListener('click', this.validatePassword.bind(this));
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
