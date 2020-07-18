import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountViewComponent } from './account.component';

describe('AccountViewComponent', () => {
  let component: AccountViewComponent;
  let fixture: ComponentFixture<AccountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountViewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
