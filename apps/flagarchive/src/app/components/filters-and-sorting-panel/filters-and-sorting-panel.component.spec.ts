import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { FiltersAndSortingPanelComponent } from './filters-and-sorting-panel.component';

describe('FiltersAndSortingPanelComponent', () => {
  let component: FiltersAndSortingPanelComponent;
  let fixture: ComponentFixture<FiltersAndSortingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersAndSortingPanelComponent],
      providers: [
        provideAnimationsAsync(),
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersAndSortingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
