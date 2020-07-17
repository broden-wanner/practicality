import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeningPage } from './listening.page';

describe('ListeningPage', () => {
  let component: ListeningPage;
  let fixture: ComponentFixture<ListeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
