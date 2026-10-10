import settings from '../data/settings.json';

// While there's no email address yet, "email us" links fall back to the contact page.
export function contactHref(subject?: string) {
  if (!settings.email) return '/contact/';
  return `mailto:${settings.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
