import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Portfolio } from './portfolio';

// activeTab / selectTab are `protected`; reach them via a typed cast in tests.
interface PortfolioInternals {
  activeTab(): string;
  selectTab(id: string): void;
}
const internals = (c: unknown) => c as PortfolioInternals;

describe('Portfolio (URL-driven tabs)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('activates the tab from the ?tab= query param', async () => {
    await TestBed.inject(Router).navigate([], { queryParams: { tab: 'projects' } });
    const fixture = TestBed.createComponent(Portfolio);
    expect(internals(fixture.componentInstance).activeTab()).toBe('projects');
  });

  it('falls back to "about" for an unknown tab value', async () => {
    await TestBed.inject(Router).navigate([], { queryParams: { tab: 'nope' } });
    const fixture = TestBed.createComponent(Portfolio);
    expect(internals(fixture.componentInstance).activeTab()).toBe('about');
  });

  it('selectTab navigates, merging the tab into the query params', () => {
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(Portfolio);

    internals(fixture.componentInstance).selectTab('skills');

    expect(navSpy).toHaveBeenCalledWith(
      [],
      expect.objectContaining({ queryParams: { tab: 'skills' }, queryParamsHandling: 'merge' }),
    );
  });
});
