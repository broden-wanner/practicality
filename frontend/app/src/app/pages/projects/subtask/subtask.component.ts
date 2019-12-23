import { Component, OnInit, Input } from '@angular/core';
import { Subtask } from 'src/app/shared/models/subtask';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {}

  /**
   * Toggles the subtask completion state and puts the new subtask to the server
   * @param subtask - the subtask to check
   */
  public checkSubtask(subtask: Subtask): void {
    subtask.completed = !subtask.completed;
    this.projectService.updateSubtask(subtask).subscribe();
  }
}
