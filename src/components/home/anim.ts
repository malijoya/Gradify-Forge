import type { CSSProperties } from "react";

/** Inline style setting --d, the extra delay for an .anim-* piece inside a revealed section. */
export const delay = (ms: number, style?: CSSProperties) => ({ ...style, "--d": `${ms}ms` }) as CSSProperties;
