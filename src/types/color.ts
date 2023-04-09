export interface ColorTemperature {
  mirek: number;
  mirek_valid: boolean;
  mirek_schema: {
    mirek_minimum: number;
    mirek_maximum: number;
  };
}

export interface ColorConfig {
  xy: {
    x: number;
    y: number;
  };
  gamut_type: "C" | "A" | "B";
  gamut: {
    red: {
      x: number;
      y: number;
    };
    green: {
      x: number;
      y: number;
    };
    blue: {
      x: number;
      y: number;
    };
  };
}
