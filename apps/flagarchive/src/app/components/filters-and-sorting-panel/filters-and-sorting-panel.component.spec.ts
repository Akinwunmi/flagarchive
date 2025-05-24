import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { FiltersAndSortingPanelComponent } from './filters-and-sorting-panel.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

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
        {
          provide: SupabaseService,
          useClass: MockSupabaseService,
        },
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
