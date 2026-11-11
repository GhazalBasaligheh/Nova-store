import { notFound } from 'next/navigation';

// Catches every unknown path inside a locale so the localized not-found page renders
// (with the header, footer, language and theme) instead of the bare default 404.
export default function CatchAllPage() {
  notFound();
}
