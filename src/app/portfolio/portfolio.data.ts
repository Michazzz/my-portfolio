import { Portfolio } from './portfolio.model';

/**
 * Single source of truth for the page content.
 * Swap these values for your own — the layout reacts automatically.
 */
export const PORTFOLIO: Portfolio = {
  brand: 'My portfolio',
  name: 'Michał Wojtalewicz',
  greeting: "Hi there! I am Michał Wojtalewicz - fullstack developer.",
  avatarInitials: 'MW',
  about:
    'Working on improving myself by exploring new ideas and designing user ' +
    'interfaces for mobile and web. Combining my graphic and visual designing ' +
    'skills to create an overall great experience.',
  links: [
    { label: 'https://example.com', url: 'https://example.com', icon: 'link' },
    { label: 'in/michal-sajmon', url: 'https://linkedin.com', icon: 'linkedin' },
    { label: 'michal.sajmon', url: 'https://facebook.com', icon: 'facebook' },
  ],
  email: 'michal.sajmon@gmail',
  phone: '+48 000 000 000',
  skills: ['.NET', 'Angular', 'TypeScript', 'UI / UX', 'Docker', 'SQL'],
  services: [
    { label: 'Website Designing', icon: '🌐' },
    { label: 'Social Media Management', icon: '📣' },
    { label: 'Copywriting', icon: '✍️' },
    { label: 'Community Management', icon: '👥' },
    { label: 'Graphic Designing', icon: '🎨' },
    { label: 'Content Creation', icon: '🎬' },
  ],
  tools: [
    { label: 'Figma', icon: '🎨' },
    { label: 'VS Code', icon: '🧩' },
    { label: 'Notion', icon: '📝' },
    { label: 'Photoshop', icon: '🖌️' },
  ],
};
