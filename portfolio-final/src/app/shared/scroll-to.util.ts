/**
 * Fait défiler la page en douceur vers une section identifiée par son id.
 * Ne fait rien côté serveur (SSR) où `document` n'existe pas.
 */
export function scrollToSection(id: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
