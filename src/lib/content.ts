import { getCollection } from 'astro:content';

// Drafts show up while previewing locally, never on the live site.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

const statusOrder = ['Available for adoption', 'Adoption pending', 'In foster care', 'Sanctuary resident', 'Adopted'];

export async function getAnimals() {
  const all = await getCollection('animals', visible);
  return all.sort((a, b) => statusOrder.indexOf(a.data.status) - statusOrder.indexOf(b.data.status) || a.data.name.localeCompare(b.data.name));
}

export async function getEvents() {
  const all = await getCollection('events', visible);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = all.filter((e) => e.data.date >= today).sort((a, b) => +a.data.date - +b.data.date);
  const past = all.filter((e) => e.data.date < today).sort((a, b) => +b.data.date - +a.data.date);
  return { upcoming, past };
}

export function formatEventDate(data: { date: Date; dateText?: string }) {
  if (data.dateText) return data.dateText;
  return data.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
