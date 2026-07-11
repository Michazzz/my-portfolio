import { TestBed } from '@angular/core/testing';
import { EmailReveal } from './email-reveal';

describe('EmailReveal', () => {
  function setup(user = 'john.doe', domain = 'example.com') {
    const fixture = TestBed.createComponent(EmailReveal);
    fixture.componentRef.setInput('user', user);
    fixture.componentRef.setInput('domain', domain);
    fixture.detectChanges();
    return fixture;
  }

  it('hides the full address until revealed (anti-harvesting)', () => {
    const el = setup().nativeElement as HTMLElement;
    expect(el.textContent).toContain('Show email');
    expect(el.textContent).not.toContain('john.doe@example.com');
    expect(el.querySelector('a')).toBeNull();
  });

  it('assembles the mailto link on click', () => {
    const fixture = setup();
    const el = fixture.nativeElement as HTMLElement;

    el.querySelector('button')!.click();
    fixture.detectChanges();

    const link = el.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('mailto:john.doe@example.com');
    expect(el.textContent).toContain('john.doe@example.com');
  });
});
