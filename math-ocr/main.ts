import { EditorExtensions } from "editor-enhancements";
import { v4 as uuidv4 } from "uuid";
import { Editor, Plugin, Notice, request } from "obsidian";
import {
  MathOCRSettingTab,
  MathOCRSettings,
  DEFAULT_SETTINGS,
} from "./settings";
import { SimpleTexResponse } from "api";

const PLUGIN_NAME = "math-ocr";

export default class AutoLinkTitle extends Plugin {
  settings: MathOCRSettings;
  blacklist: Array<string>;

  async onload() {
    console.log(`Loading ${PLUGIN_NAME} plugin`);
    await this.loadSettings();

    this.addCommand({
      id: "convert-clip-to-mathjax",
      name: "Convert clipboard to MathJax",
      editorCallback: (editor) => this.startTypeset(editor),
      hotkeys: [
        {
          modifiers: ["Mod", "Shift"],
          key: "c",
        },
      ],
    });

    this.addSettingTab(new MathOCRSettingTab(this.app, this));
  }

  private async getClipboardImage(): Promise<Blob> | null {
    try {
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
        if (!item.types.includes("image/png")) {
          throw new Error("Clipboard does not contain PNG image data.");
        }
        const blob = await item.getType("image/png");
        return blob;
      }
    } catch (error) {
      new Notice("Error reading image from clipboard.");
    }
  }

  async startTypeset(editor: Editor): Promise<void> {
    // Generate a unique id for find/replace operations
    const pasteId = this.getPasteId();
    editor.replaceRange(pasteId, editor.getCursor());
    editor.setCursor(
      editor.getCursor().line,
      editor.getCursor().ch + pasteId.length,
    );

    // Fetch title from site, replace Fetching Title with actual title
    const image = await this.getClipboardImage();
    const title = await this.uploadImageToAPI(image);
    const escapedTitle = this.singleLineWrap(title);

    const text = editor.getValue();

    const start = text.indexOf(pasteId);
    if (start < 0) {
      console.log(
        `Unable to find text "${pasteId}" in current editor, bailing out`,
      );
    } else {
      const end = start + pasteId.length;
      const startPos = EditorExtensions.getEditorPositionFromIndex(text, start);
      const endPos = EditorExtensions.getEditorPositionFromIndex(text, end);

      editor.replaceRange(escapedTitle, startPos, endPos);
    }
  }

  singleLineWrap(text: string): string {
    return `$${text}$`;
  }

  public async uploadImageToAPI(blob: Blob): Promise<string> {
    try {
      const apiEndpoint = `https://server.simpletex.net/api/latex_ocr`;

      const fieldName = "file";
      const boundary = uuidv4().replace(/-/g, "");
      const chunk =
        `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="${fieldName}";`;
      const value =
        `filename="image.jpg"\r\n` + `Content-Type: ${blob.type}\r\n\r\n`;
      const endSequence = `\r\n--${boundary}--\r\n`;

      const bytes = [];
      bytes.push(...chunk.split("").map((c) => c.charCodeAt(0)));
      bytes.push(...value.split("").map((c) => c.charCodeAt(0)));
      bytes.push(...new Uint8Array(await blob.arrayBuffer()));
      bytes.push(...endSequence.split("").map((c) => c.charCodeAt(0)));

      const requestPayload = {
        method: "POST",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          token: this.settings.simpletexAPIKey,
        },
        body: new Uint8Array(bytes).buffer,
      };

      const rawResponse = await request({
        url: apiEndpoint,
        ...requestPayload,
      });
      const parsedResponse = JSON.parse(rawResponse) as SimpleTexResponse;

      if (!parsedResponse.status) {
        console.error(parsedResponse);
        return "error from api";
      }

      const latex = parsedResponse.res.latex;
      latex.replace(/\u00a0/g, " "); // Replace non-breaking spaces with regular spaces
      return latex.trim();
    } catch (error) {
      console.error(error);
      return "error while processing";
    }
  }

  private getPasteId(): string {
    var base = "$\\textrm{loading...}$";
    if (this.settings.useBetterPasteId) {
      return this.getBetterPasteId(base);
    } else {
      return `${base}#${this.createBlockHash()}`;
    }
  }

  private getBetterPasteId(base: string): string {
    // After every character, add 0, 1 or 2 invisible characters
    // so that to the user it looks just like the base string.
    // The number of combinations is 3^14 = 4782969
    let result = "";
    var invisibleCharacter = "\u200B";
    var maxInvisibleCharacters = 2;
    for (var i = 0; i < base.length; i++) {
      var count = Math.floor(Math.random() * (maxInvisibleCharacters + 1));
      result += base.charAt(i) + invisibleCharacter.repeat(count);
    }
    return result;
  }

  // Custom hashid by @shabegom
  private createBlockHash(): string {
    let result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onunload() {
    console.log(`Unloading ${PLUGIN_NAME} plugin`);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
