import { Reference } from "./reference";

export interface MotionConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  enabled: boolean;
  motion: {
    motion: boolean;
    motion_valid: boolean;
    motion_report: {
      changed: string;
      motion: boolean;
    };
  };
  sensitivity: {
    status: string;
    sensitivity: number;
    sensitivity_max: boolean;
  };
  type: "motion";
}

export namespace MotionConfig {
  export function is_cheap(value: any | MotionConfig): value is MotionConfig {
    return value.type === "motion";
  }
}
