import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTestComponent } from './ngx-test.component';

describe('NgxTestComponent', () => {
  let component: NgxTestComponent;
  let fixture: ComponentFixture<NgxTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
