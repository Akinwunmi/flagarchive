import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ENTITIES_STUB } from '@flagarchive/entities';

import { EntityComponent } from './entity.component';

describe(EntityComponent.name, () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityComponent],
      providers: [provideRouter([])],
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
});
