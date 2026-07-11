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

  it('renders a "View project" link only for projects with a url', () => {
    const el = render([
      { title: 'A', description: 'd', icon: '🚀', tech: ['X'], url: 'https://a.dev' },
      { title: 'B', description: 'd', icon: '🎯', tech: [] },
    ]);
    const links = Array.from(el.querySelectorAll('a'));
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('https://a.dev');
    expect(links[0].textContent).toContain('View project');
  });

  it('renders the tech stack as badges', () => {
    const el = render([{ title: 'A', description: 'd', icon: '🚀', tech: ['.NET', 'Docker'] }]);
    const badges = Array.from(el.querySelectorAll('.badge')).map((b) => b.textContent?.trim());
    expect(badges).toContain('.NET');
    expect(badges).toContain('Docker');
  });
});
