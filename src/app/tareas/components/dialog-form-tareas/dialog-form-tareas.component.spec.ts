import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormTareasComponent } from './dialog-form-tareas.component';

describe('DialogFormTareasComponent', () => {
  let component: DialogFormTareasComponent;
  let fixture: ComponentFixture<DialogFormTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
