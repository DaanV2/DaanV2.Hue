export type GamutPoint = [x: number, y: number];
export interface GamutConfig {
  red: GamutPoint;
  green: GamutPoint;
  blue: GamutPoint;
}

export interface GamutResult {
  dimming: { brightness: number };
  color: { xy: { x: number; y: number } };
}

export namespace Gamut {
  export const A: GamutConfig = {
    red: [0.704, 0.296],
    green: [0.2151, 0.7106],
    blue: [0.138, 0.08],
  };
  export const B: GamutConfig = {
    red: [0.675, 0.322],
    green: [0.409, 0.518],
    blue: [0.167, 0.04],
  };
  export const C: GamutConfig = {
    red: [0.6915, 0.3038],
    green: [0.17, 0.7],
    blue: [0.1532, 0.0475],
  };
  export const unknown: GamutConfig = {
    red: [1.0, 0.0],
    green: [0.0, 1.0],
    blue: [0.0, 0.0],
  };

  export function getGamut(gamut: string): GamutConfig {
    switch (gamut) {
      case "A":
        return A;
      case "B":
        return B;
      case "C":
        return C;
    }

    return unknown;
  }

  /** Converts an RGB color to a CIE 1931 XY color.
   * @param red
   * @param green
   * @param blue
   * @returns
   */
  export function fromRGB(red: number, green: number, blue: number): GamutResult {
    red = clamp(red, 0, 255) / 255;
    green = clamp(green, 0, 255) / 255;
    blue = clamp(blue, 0, 255) / 255;

    // Specification from: https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back/
    const r = red > 0.04045 ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : red / 12.92;
    const g = green > 0.04045 ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : green / 12.92;
    const b = blue > 0.04045 ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : blue / 12.92;

    const X = red * 0.4124 + green * 0.3576 + blue * 0.1805;
    const Y = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const Z = red * 0.0193 + green * 0.1192 + blue * 0.9505;

    return {
      dimming: { brightness: Y },
      color: {
        xy: {
          x: X / (X + Y + Z),
          y: Y / (X + Y + Z),
        },
      },
    };
  }

  export function toRGB(x: number, y: number, brightness: number): [r: number, g: number, b: number] {
    // Apply gamma correction
    const Y = brightness;
    const X = (Y / y) * x;
    const Z = (Y / y) * (1 - x - y);

    // Convert to RGB using Wide RGB D65 conversion
    const red = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    const green = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    const blue = X * 0.051713 - Y * 0.121364 + Z * 1.01153;

    // Apply reverse gamma correction
    const r = red <= 0.0031308 ? 12.92 * red : (1.0 + 0.055) * Math.pow(red, 1.0 / 2.4) - 0.055;
    const g = green <= 0.0031308 ? 12.92 * green : (1.0 + 0.055) * Math.pow(green, 1.0 / 2.4) - 0.055;
    const b = blue <= 0.0031308 ? 12.92 * blue : (1.0 + 0.055) * Math.pow(blue, 1.0 / 2.4) - 0.055;

    return [r, g, b];
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
