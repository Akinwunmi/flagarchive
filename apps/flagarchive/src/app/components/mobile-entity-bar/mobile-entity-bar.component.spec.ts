import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ENVIRONMENT_STUB, MockSupabaseService } from '../../mocks';
import { SupabaseService } from '../../services';
import { MobileEntityBarComponent } from './mobile-entity-bar.component';

jest.mock('../../../environments/environment', () => ENVIRONMENT_STUB);

describe('MobileEntityBarComponent', () => {
  let component: MobileEntityBarComponent;
  let fixture: ComponentFixture<MobileEntityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileEntityBarComponent],
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

    fixture = TestBed.createComponent(MobileEntityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
