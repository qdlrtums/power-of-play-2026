import { JetBrains_Mono } from "next/font/google";

/**
 * Label face for the live design and the comparison viewer's toolbar:
 * eyebrows, step numbers, the small clinical captions. Two weights, no
 * italics — it never sets a paragraph, so the rest of the family would be
 * dead weight.
 *
 * Deliberately NOT declared in the root layout. next/font preloads a face on
 * every route whose layout declares it, so putting it there made the live
 * pages fetch a third font file they never reference. Declared here and
 * imported by the two layouts that use it, it is preloaded only where it is
 * actually set — and the shared module keeps both from drifting into two
 * different subsets of the same family.
 */
export const monoLabel = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-label",
  display: "swap",
});
