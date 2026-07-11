import { TestBed } from '@angular/core/testing';
import { TechIcon } from './tech-icon';

describe('TechIcon', () => {
  function render(name: string): HTMLElement {
    const fixture = TestBed.createComponent(TechIcon);
    fixture.componentRef.setInput('name', name);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders a brand logo (with its brand color) for a known skill', () => {
    const svg = render('TypeScript').querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.querySelector('path')).not.toBeNull();
    expect(svg!.getAttribute('fill')).toBe('#3178C6');
  });

  it('falls back to currentColor for logos too dark on a dark background', () => {
    // Angular's brand color (#0F0F11) is near-black.
    expect(render('Angular').querySelector('svg')!.getAttribute('fill')).toBe('currentColor');
  });

  it('matches skill names case-insensitively', () => {
    expect(render('typescript').querySelector('svg')).not.toBeNull();
  });

  it('renders nothing for a skill without a known logo', () => {
    expect(render('Some Unknown Tech').querySelector('svg')).toBeNull();
  });
});
