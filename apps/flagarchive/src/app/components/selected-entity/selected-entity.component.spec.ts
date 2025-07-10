import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { SelectedEntityComponent } from './selected-entity.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe(SelectedEntityComponent.name, () => {
  let component: SelectedEntityComponent;
  let fixture: ComponentFixture<SelectedEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedEntityComponent],
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

    fixture = TestBed.createComponent(SelectedEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
