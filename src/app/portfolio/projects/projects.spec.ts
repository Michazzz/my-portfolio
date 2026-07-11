import { TestBed } from '@angular/core/testing';
import { Projects } from './projects';
import { Project } from '../portfolio.model';

describe('Projects', () => {
  function render(items: Project[]): HTMLElement {
    const fixture = TestBed.createComponent(Projects);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('links to GitHub and the website only when those urls are set', () => {
    const el = render([
      {
        title: 'A',
        description: 'd',
        icon: '🚀',
        tech: ['X'],
        github: 'https://github.com/a',
        url: 'https://a.dev',
      },
      { title: 'B', description: 'd', icon: '🎯', tech: [] },
    ]);

    const gh = el.querySelectorAll('a[aria-label="GitHub repository"]');
    const web = el.querySelectorAll('a[aria-label="Visit website"]');
    // Only project A has links.
    expect(gh.length).toBe(1);
    expect(web.length).toBe(1);
    expect(gh[0].getAttribute('href')).toBe('https://github.com/a');
    expect(web[0].getAttribute('href')).toBe('https://a.dev');
  });

  it('renders the tech stack as badges', () => {
    const el = render([{ title: 'A', description: 'd', icon: '🚀', tech: ['.NET', 'Docker'] }]);
    const badges = Array.from(el.querySelectorAll('.badge')).map((b) => b.textContent?.trim());
    expect(badges).toContain('.NET');
    expect(badges).toContain('Docker');
  });
});
