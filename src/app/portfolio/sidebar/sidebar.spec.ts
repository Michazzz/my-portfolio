import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sidebar } from './sidebar';
import { Portfolio } from '../portfolio.model';

const DATA = {
  name: 'Jane Doe',
  greeting: 'Hi, I am Jane Doe — engineer.',
  avatarInitials: 'JD',
  location: 'Berlin',
  locationUrl: 'https://maps.example/berlin',
  certifications: [
    { name: 'Cert A', issuer: 'Issuer', url: 'https://cert.example/a' },
    { name: 'Cert B', issuer: 'Issuer' },
  ],
  education: [{ school: 'Uni', degree: 'BSc', period: '2015' }],
  languages: [{ name: 'English', level: 'C1' }],
  skillGroups: [],
} as unknown as Portfolio;

describe('Sidebar', () => {
  function render(data: Portfolio = DATA): HTMLElement {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Sidebar);
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the name in bold inside the greeting', () => {
    const strong = render().querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toBe('Jane Doe');
  });

  it('links a certification with a url and shows the other as plain text', () => {
    const el = render();
    const certLinks = Array.from(el.querySelectorAll('a')).filter((a) =>
      a.textContent?.includes('Cert'),
    );
    expect(certLinks.length).toBe(1);
    expect(certLinks[0].getAttribute('href')).toBe('https://cert.example/a');
    expect(el.textContent).toContain('Cert B');
  });

  it('links the location when locationUrl is set', () => {
    const locLink = Array.from(render().querySelectorAll('a')).find(
      (a) => a.textContent?.trim() === 'Berlin',
    );
    expect(locLink).toBeTruthy();
    expect(locLink!.getAttribute('href')).toBe('https://maps.example/berlin');
  });
});
