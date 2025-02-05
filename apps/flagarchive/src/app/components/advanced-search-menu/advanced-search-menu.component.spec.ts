import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Layout, SortDirection } from '@flagarchive/advanced-search';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { FIREBASE_CONFIG } from '../../firebase.config';
import { AdvancedSearchMenuComponent } from './advanced-search-menu.component';

describe('AdvancedSearchMenuComponent', () => {
  let component: AdvancedSearchMenuComponent;
  let fixture: ComponentFixture<AdvancedSearchMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdvancedSearchMenuComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
        provideFirestore(() => getFirestore()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchMenuComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should update the layout options', () => {
    setup();
    component.updateLayout(Layout.List);
    const listLayout = component
      .layoutOptions()
      .find((option) => option.value === Layout.List);
    expect(listLayout?.active).toEqual(true);
  });

  it('should update the sort options', () => {
    setup();
    component.updateSortDirection(SortDirection.Desc);
    const descSortDirection = component
      .sortOptions()
      .find((option) => option.value === SortDirection.Desc);
    expect(descSortDirection?.active).toEqual(true);
  });
});
