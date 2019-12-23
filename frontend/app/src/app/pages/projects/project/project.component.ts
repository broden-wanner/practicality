import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  newSubtaskEvent: Subject<Project>;

  constructor() {
    this.newSubtaskEvent = new Subject<Project>();
  }

  ngOnInit() {}

  /**
   * Emit a signal to the subtask list to create a new subtask component
   */
  public newSubtask(project: Project): void {
    this.newSubtaskEvent.next(project);
  }
}
