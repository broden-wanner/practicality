import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../../../../shared/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  public newSubtaskEvent: Subject<void>;

  constructor() {
    this.newSubtaskEvent = new Subject<void>();
  }

  ngOnInit() {}

  /**
   * Emit a signal to the subtask list to create a new subtask component
   */
  public newSubtask(): void {
    this.newSubtaskEvent.next();
  }
}
