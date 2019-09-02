import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListComponent } from './note-list.component';

describe('NoteListComponent', () => {
    let component: NoteListComponent;
    let fixture: ComponentFixture<NoteListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NoteListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
