/** Data model for the portfolio. Edit `portfolio.data.ts` to change the content. */

export interface SocialLink {
  /** Text shown on the card. */
  label: string;
  /** Destination URL (use `mailto:` / `tel:` for contact). */
  url: string;
  /** Icon key resolved by the <app-icon> component. */
  icon: IconKey;
}

export interface CvEntry {
  role: string;
  company: string;
  /** Free-form period, e.g. "2022 – present". */
  period: string;
  description: string;
  /** Tech stack / tags for this role. */
  tech?: string[];
  /** Static path to the company logo (e.g. "/logos/acme.svg"). Omit to show no logo. */
  logoUrl?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
  url?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  /** Free-form period, e.g. "2015 – 2019". */
  period: string;
}

export interface SelectedProject {
  title: string;
  /** Your role, e.g. "Tech Lead". */
  role?: string;
  description: string;
  /** Leadership / management highlights to expose. */
  leadership: string[];
  tech?: string[];
}

export interface SkillGroup {
  category: string;
  /** Skill names; a matching tech logo is shown when one is available. */
  skills: string[];
}

export interface Language {
  name: string;
  /** e.g. "Native", "B2". */
  level: string;
}

export interface Project {
  title: string;
  description: string;
  /** Emoji or short glyph shown on the card. */
  icon: string;
  /** Tech stack / tags. */
  tech: string[];
  /** Optional link to a repo or live demo. */
  url?: string;
}

export type IconKey = 'link' | 'linkedin' | 'github' | 'mail' | 'phone';

/**
 * Email split into parts so the full `user@domain` never appears literally in
 * the served DOM or the repo — assembled client-side on reveal (anti-harvesting).
 */
export interface EmailParts {
  user: string;
  domain: string;
}

export interface Portfolio {
  name: string;
  greeting: string;
  /** Initials shown in the avatar placeholder. */
  avatarInitials: string;
  about: string;
  /** City / location shown under the greeting. */
  location: string;
  /** Optional map link (e.g. Google Maps) the location text points to. */
  locationUrl?: string;
  links: SocialLink[];
  email: EmailParts;
  /** Short "What I do" bullet points. */
  whatIDo: string[];
  skillGroups: SkillGroup[];
  certifications: Certification[];
  languages: Language[];
  education: EducationEntry[];
  projects: Project[];
  selectedProjects: SelectedProject[];
  /** Biggest achievements / highlights (Achievements tab). */
  highlights: string[];
}
