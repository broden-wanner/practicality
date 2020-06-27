import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashBoardComponent } from './dashboard.component';

describe('DashBoardComponent', () => {
    let component: DashBoardComponent;
    let fixture: ComponentFixture<DashBoardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashBoardComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(DashBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
