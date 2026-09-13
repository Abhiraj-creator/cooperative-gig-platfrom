/**
 * Shared component barrel.
 * Import from "@/shared/components" everywhere in the app.
 *
 * @example
 * import { TextReveal, TextRoll } from "@/shared/components";
 * import type { TextRevealHandler } from "@/shared/components";
 */
export { default as TextReveal } from "./TextReveal";
export { default as TextRoll } from "./TextRoll";
export { AppShell } from "./AppShell";

// Re-export handler type so consumers don't need to reach into the types folder.
export type { TextRevealHandler } from "@/types/TextReveal.types";
