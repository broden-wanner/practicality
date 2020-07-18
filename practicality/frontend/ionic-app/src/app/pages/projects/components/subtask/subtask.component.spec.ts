import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtaskComponent } from './subtask.component';

describe('SubtaskComponent', () => {
  let component: SubtaskComponent;
  let fixture: ComponentFixture<SubtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtaskComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
