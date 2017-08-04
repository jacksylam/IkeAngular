import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOximinComponent } from './ngx-oximin.component';

describe('NgxOximinComponent', () => {
  let component: NgxOximinComponent;
  let fixture: ComponentFixture<NgxOximinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxOximinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxOximinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
