import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { FilterSidepanelComponent } from './filter-sidepanel.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe(FilterSidepanelComponent.name, () => {
  let component: FilterSidepanelComponent;
  let fixture: ComponentFixture<FilterSidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSidepanelComponent],
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

    fixture = TestBed.createComponent(FilterSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
