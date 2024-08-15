import { copyNodeAsImage } from "./copy-to-clipboard";

if (typeof ClipboardItem === "undefined") {
  globalThis.ClipboardItem = class ClipboardItem {
    types: string[];

    constructor(public items: Record<string, string | Blob | PromiseLike<string | Blob>>) {
      this.types = Object.keys(items);
    }

    async getType(type: string): Promise<Blob> {
      const item = this.items[type];
      if (item instanceof Blob) {
        return item;
      } else if (typeof item === "string") {
        return new Blob([item]);
      } else if (item instanceof Promise) {
        const resolvedItem = await item;
        return resolvedItem instanceof Blob ? resolvedItem : new Blob([String(resolvedItem)]);
      }
      throw new Error(`No item for type: ${type}`);
    }
  } as unknown as typeof ClipboardItem;
}

describe("copyNodeAsImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should copy node as image to clipboard when node is valid", async () => {
    document.body.innerHTML = '<div id="test-node">hello</div>';
    const node = document.getElementById("test-node");

    const mockWrite = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: {
        write: mockWrite,
        read: vi.fn().mockResolvedValue([
          new ClipboardItem({
            "image/png": new Blob(["mock image data"], { type: "image/png" }),
          }),
        ]),
      },
      writable: true,
    });

    if (node !== null) {
      await copyNodeAsImage(node);
    }

    // Check if clipboard.write was called
    expect(mockWrite).toHaveBeenCalled();

    // Check if the written data is of the correct type
    const [writeArg] = mockWrite.mock.calls[0][0];
    expect(writeArg).toBeInstanceOf(ClipboardItem);
    expect(writeArg.types).toContain("image/png");
  });

  it("should throw error when node is null", async () => {
    await expect(copyNodeAsImage(null)).rejects.toThrow("Failed to copy image to clipboard");
  });
});
