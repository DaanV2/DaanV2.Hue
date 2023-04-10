type RGB = [red: number, green: number, blue: number];

export namespace RGB {
  export function fromHex(hex: string): RGB {
    const value = parseInt(hex, 16);
    return [value >> 16, (value >> 8) & 0xff, value & 0xff];
  }

  export function toHex(rgb: RGB): string {
    return rgb.map((value) => value.toString(16).padStart(2, "0")).join("");
  }
}
