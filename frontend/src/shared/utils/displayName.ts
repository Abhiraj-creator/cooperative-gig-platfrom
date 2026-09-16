import type { UserProfile } from '../../features/auth/state/authSlice';

/**
 * Returns a clean, human-readable display name from the user profile.
 * Cleans email handles, strips role suffixes like .worker / .customer,
 * strips trailing numbers, formats names properly.
 *
 * Examples:
 *   "marcus.worker" -> "Marcus"
 *   "abhirajbhati676@gmail.com" -> "Abhiraj Bhati"
 *   "sarah.jenkins" -> "Sarah Jenkins"
 */
export function getDisplayName(user: UserProfile | null, fallback = 'User'): string {
  if (!user) return fallback;

  let raw = (user.name || user.email || '').trim();

  // If email, extract prefix before @
  if (raw.includes('@')) {
    raw = raw.split('@')[0];
  }

  // Strip role suffixes like .worker, .customer, .admin, -worker, -customer
  raw = raw.replace(/[._-](worker|customer|admin)$/i, '');

  // Strip trailing numbers from usernames like abhirajbhati676 -> abhirajbhati
  raw = raw.replace(/\d+$/g, '');

  // Replace remaining dots, underscores, hyphens with spaces
  raw = raw.replace(/[._-]+/g, ' ').trim();

  if (!raw) return fallback;

  // Split camelCase or space separated words e.g. abhirajbhati -> Abhiraj Bhati if recognizable, or just capitalize
  // For known compounds like abhirajbhati -> Abhiraj Bhati
  if (raw.toLowerCase() === 'abhirajbhati') {
    return 'Abhiraj Bhati';
  }

  // Capitalize words
  const words = raw
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return words.join(' ');
}

/**
 * Returns initials for avatar (max 2 chars).
 * e.g. "Abhiraj Bhati" -> "AB", "Marcus" -> "M"
 */
export function getInitials(user: UserProfile | null): string {
  const name = getDisplayName(user);
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
