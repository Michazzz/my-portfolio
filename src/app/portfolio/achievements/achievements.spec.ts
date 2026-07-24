import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Achievements } from './achievements';
import { SelectedProject } from '../portfolio.model';

describe('Achievements', () => {
  const proj: SelectedProject = {
    title: 'Telematics Platform',
    role: 'Tech Lead',
    description: 'Led delivery',
    leadership: ['Mentoring', 'Architecture ownership'],
    tech: ['.NET'],
  };

  beforeEach(() => {
    // The case-study link uses routerLink, so a router provider is required.
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  function render(items: SelectedProject[], highlights: string[]): HTMLElement {
    const fixture = TestBed.createComponent(Achievements);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('highlights', highlights);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the Highlights section only when there are highlights', () => {
    expect(render([proj], []).textContent).not.toContain('Highlights');
    expect(render([proj], ['Shipped to millions of vehicles']).textContent).toContain('Highlights');
  });

  it('renders the role and leadership badges of a selected project', () => {
    const text = render([proj], []).textContent ?? '';
    expect(text).toContain('Telematics Platform');
    expect(text).toContain('Tech Lead');
    expect(text).toContain('Leadership');
    expect(text).toContain('Mentoring');
    expect(text).toContain('Architecture ownership');
  });

  it('links to the case study only when the project has a slug', () => {
    expect(render([proj], []).querySelector('a[href^="/projects/"]')).toBeNull();

    const withSlug = render([{ ...proj, slug: 'telematics' }], []);
    const link = withSlug.querySelector('a[href^="/projects/"]');
    expect(link?.getAttribute('href')).toBe('/projects/telematics');
  });
});
