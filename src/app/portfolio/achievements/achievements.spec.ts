import { TestBed } from '@angular/core/testing';
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
});
