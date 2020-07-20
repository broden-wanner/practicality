import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { Subtask } from '../../../../shared/models/subtask';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss'],
})
export class SubtaskListComponent implements OnInit {
  @Input() forNewProject: boolean;
  @Input() project: Project;
  @Input() newSubtaskEvent: Observable<void>;

  constructor() {}

  ngOnInit() {
    // Subscribe to the new subtask event
    this.newSubtaskEvent.subscribe(() => this.makeSubtask());
  }

  /**
   * Create a new empty subtask on the project and append it to the list of subtasks on the project
   */
  public makeSubtask(): void {
    const newSubtask = Subtask.emptySubtaskOn(this.project);
    newSubtask.editing = true;
    this.project.subtasks.push(newSubtask);
  }
}
