import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HabitComponent } from './habit.component';

describe('HabitComponent', () => {
  let component: HabitComponent;
  let fixture: ComponentFixture<HabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
