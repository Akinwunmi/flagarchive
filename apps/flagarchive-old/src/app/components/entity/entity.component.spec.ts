import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ENTITIES_STUB } from '@flagarchive/entities';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { EntityComponent } from './entity.component';

describe('EntityComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntityComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('entity', ENTITIES_STUB[0]);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should return alt parent id', () => {
    setup();
    const result = component.setAltParentId('eu-nld');
    expect(result).toBe('nld');
  });

  it('should return empty string for alt parent id', () => {
    setup();
    const result = component.setAltParentId('');
    expect(result).toBe('');
  });
});
