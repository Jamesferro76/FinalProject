import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterChatComponent } from './inter-chat.component';

describe('InterChatComponent', () => {
  let component: InterChatComponent;
  let fixture: ComponentFixture<InterChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
