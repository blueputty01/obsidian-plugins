import { EditorPosition } from "obsidian";

interface WordBoundaries {
  start: { line: number; ch: number };
  end: { line: number; ch: number };
}

export class EditorExtensions {
  public static getEditorPositionFromIndex(
    content: string,
    index: number,
  ): EditorPosition {
    let substr = content.substr(0, index);

    let l = 0;
    let offset = -1;
    let r = -1;
    for (; (r = substr.indexOf("\n", r + 1)) !== -1; l++, offset = r);
    offset += 1;

    let ch = content.substr(offset, index - offset).length;

    return { line: l, ch: ch };
  }
}
