/** Data model for the portfolio. Edit `portfolio.data.ts` to change the content. */

export interface SocialLink {
  /** Text shown on the card. */
  label: string;
  /** Destination URL (use `mailto:` / `tel:` for contact). */
  url: string;
  /** Icon key resolved by the <app-icon> component. */
  icon: IconKey;
}

export interface CardItem {
  label: string;
  /** Emoji or short glyph shown before the label. */
  icon: string;
}

export type IconKey = 'link' | 'linkedin' | 'facebook' | 'github' | 'mail' | 'phone';

export interface Portfolio {
  brand: string;
  name: string;
  greeting: string;
  /** Initials shown in the avatar placeholder. */
  avatarInitials: string;
  about: string;
  links: SocialLink[];
  email: string;
  phone: string;
  skills: string[];
  services: CardItem[];
  tools: CardItem[];
}
