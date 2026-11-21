/**
 * Retired in the calm theme (no ghost words). Kept as no-op exports so pages that still import them compile;
 * the page sessions remove the imports (C4 lists them).
 */
export const ghostWord = (kicker: string) => kicker;

export default function Ghost(_props: { word: string; dark?: boolean; clip?: boolean; className?: string }) {
  return null;
}
