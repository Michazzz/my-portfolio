import { TestBed } from '@angular/core/testing';
import { CvTimeline } from './cv-timeline';
import { CvEntry } from '../portfolio.model';

describe('CvTimeline', () => {
  function render(entries: CvEntry[]): HTMLElement {
    const fixture = TestBed.createComponent(CvTimeline);
    fixture.componentRef.setInput('entries', entries);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows an empty-state message when there are no entries', () => {
    const el = render([]);
    expect(el.textContent).toContain('No experience entries yet');
    expect(el.querySelector('ol')).toBeNull();
  });

  it('renders a company logo when logoUrl is set', () => {
    const img = render([
      { role: 'Dev', company: 'ACME', period: '2020', description: 'x', logoUrl: '/logos/acme.png' },
    ]).querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('/logos/acme.png');
    expect(img!.getAttribute('alt')).toBe('ACME logo');
  });

  it('omits the logo when logoUrl is absent but still renders the role', () => {
    const el = render([{ role: 'Dev', company: 'ACME', period: '2020', description: 'x' }]);
    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).toContain('Dev');
  });
});
