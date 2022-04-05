import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentmessageboxComponent } from './sentmessagebox.component';

describe('SentmessageboxComponent', () => {
  let component: SentmessageboxComponent;
  let fixture: ComponentFixture<SentmessageboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentmessageboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentmessageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
