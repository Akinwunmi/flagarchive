import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      src: 'https://example.com/flag.png',
      alt: 'Example Flag',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
