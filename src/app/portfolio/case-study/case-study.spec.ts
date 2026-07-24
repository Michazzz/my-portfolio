import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { CaseStudy } from './case-study';
import { PORTFOLIO } from '../portfolio.data';

function configure(slug: string): void {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ slug }) } } },
    ],
  });
}

describe('CaseStudy', () => {
  it('renders the matching project for a known slug', () => {
    const known = PORTFOLIO.selectedProjects.find((p) => p.slug);
    configure(known!.slug!);

    const fixture = TestBed.createComponent(CaseStudy);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain(known!.title);
    expect(text).toContain('Back to projects');
  });

  it('redirects to home for an unknown slug', () => {
    configure('does-not-exist');
    const nav = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');

    TestBed.createComponent(CaseStudy); // resolve() runs during construction

    expect(nav).toHaveBeenCalledWith('/');
  });
});
