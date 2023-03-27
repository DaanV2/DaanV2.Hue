import { ClipError } from "./error";

export interface ClipV2Message<T> {
  errors: ClipError[];
  data: T[];
}
