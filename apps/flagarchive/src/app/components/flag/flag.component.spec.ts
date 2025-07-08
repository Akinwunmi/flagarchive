import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagCategory } from '@flagarchive/advanced-search';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { FlagComponent } from './flag.component';

describe(FlagComponent.name, () => {
  let component: FlagComponent;
  let fixture: ComponentFixture<FlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagComponent],
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('flag', {
      alt: 'Example Flag',
      reverse_src: 'https://example.com/flag-reverse.png',
      src: 'https://example.com/flag.png',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set categories tooltip', () => {
    const categories = [FlagCategory.NationalEnsign, FlagCategory.NationalFlag];
    const tooltip = component.setCategoriesTooltip(categories);
    expect(tooltip).toEqual('flag-categories.national-ensign, flag-categories.national-flag');
  });

  it('should toggle reverse flag on click', () => {
    component.toggleReversed(new MouseEvent('click'));
    expect(component.flagImageSrc()).toEqual('https://example.com/flag-reverse.png');
    expect(component.isReversed()).toEqual(true);
  });
});
