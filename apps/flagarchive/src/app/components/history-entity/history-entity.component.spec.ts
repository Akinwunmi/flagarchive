import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { HistoryEntityComponent } from './history-entity.component';

describe(HistoryEntityComponent.name, () => {
  let component: HistoryEntityComponent;
  let fixture: ComponentFixture<HistoryEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryEntityComponent],
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryEntityComponent);
    component = fixture.componentInstance;
    const { componentRef } = fixture;
    componentRef.setInput('categories', []);
    componentRef.setInput('flag', {
      src: 'https://example.com/flag.png',
      alt: 'Example Flag',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
