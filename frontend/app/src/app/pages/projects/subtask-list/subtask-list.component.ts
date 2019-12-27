import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/models/project';
import { Observable } from 'rxjs';
import { Subtask } from 'src/app/shared/models/subtask';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent implements OnInit {
  @Input() forNewProject: boolean;
  @Input() project: Project;
  @Input() newSubtaskEvent: Observable<void>;

  constructor() {}

  ngOnInit() {
    this.newSubtaskEvent.subscribe(() => this.makeSubtask());
  }

  /**
   * Create a new empty subtask on the project and append it to the host container
   */
  public makeSubtask(): void {
    const newSubtask = Subtask.emptySubtaskOn(this.project);
    newSubtask.editing = true;
    this.project.subtasks.push(newSubtask);
  }
}
