export namespace HSV {
  export function toRGB(hue: number, saturation: number, brightness: number): [number, number, number] {
    const s = saturation / 100;
    const v = brightness / 100;
    const C = s * v;
    const X = C * (1 - Math.abs(((hue / 60.0) % 2) - 1));
    const m = v - C;

    let r, g, b;
    if (hue >= 0 && hue < 60) {
      r = C;
      g = X;
      b = 0;
    } else if (hue >= 60 && hue < 120) {
      r = X;
      g = C;
      b = 0;
    } else if (hue >= 120 && hue < 180) {
      r = 0;
      g = C;
      b = X;
    } else if (hue >= 180 && hue < 240) {
      r = 0;
      g = X;
      b = C;
    } else if (hue >= 240 && hue < 300) {
      r = X;
      g = 0;
      b = C;
    } else {
      r = C;
      g = 0;
      b = X;
    }

    const R = Math.floor(r + m);
    const G = Math.floor(g + m);
    const B = Math.floor(b + m);

    return [R * 255, G * 255, B * 255];
  }
}
