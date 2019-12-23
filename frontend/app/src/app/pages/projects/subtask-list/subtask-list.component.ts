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
  @Input() project: Project;
  @Input() newSubtaskEvent: Observable<Project>;

  constructor() {}

  ngOnInit() {
    this.newSubtaskEvent.subscribe(project => {
      if (project.equals(this.project)) {
        this.newSubtask();
      }
    });
  }

  /**
   * Create a new empty subtask on the project and append it to the host container
   */
  public newSubtask(): void {
    this.project.subtasks.push(Subtask.emptySubtaskOn(this.project));
  }
}
