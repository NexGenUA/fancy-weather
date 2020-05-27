import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlBlockComponent } from './control-block.component';

describe('ControlBlockComponent', () => {
  let component: ControlBlockComponent;
  let fixture: ComponentFixture<ControlBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
