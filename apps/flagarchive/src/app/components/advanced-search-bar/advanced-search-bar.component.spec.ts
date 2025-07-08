import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { FlagCategory } from '@flagarchive/advanced-search';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { AdvancedSearchBarComponent } from './advanced-search-bar.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe(AdvancedSearchBarComponent.name, () => {
  let component: AdvancedSearchBarComponent;
  let fixture: ComponentFixture<AdvancedSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSearchBarComponent],
      providers: [
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

    fixture = TestBed.createComponent(AdvancedSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected year', () => {
    component.setSelectedYear(2000);
    const selectedYear = component.getSelectedYear();
    expect(selectedYear).toEqual(2025);
  });

  it('should select category', () => {
    component.selectCategory(FlagCategory.NavalJack);
    expect(component.activeCategory()).toEqual(FlagCategory.NavalJack);
    expect(component.isCategoryDropdownOpen()).toEqual(false);
  });
});
