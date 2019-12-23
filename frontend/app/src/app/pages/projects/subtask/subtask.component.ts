import { Component, OnInit, Input } from '@angular/core';
import { Subtask } from 'src/app/shared/models/subtask';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  subtaskForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {}

  ngOnInit() {
    this.subtaskForm = this.fb.group(this.subtask);
  }

  /**
   * Toggles the subtask completion state and puts the new subtask to the server
   * @param subtask - the subtask to check
   */
  public checkSubtask(subtask: Subtask): void {
    subtask.completed = !subtask.completed;
    this.projectService.updateSubtask(subtask).subscribe();
  }

  // TODO: Finish this
  /**
   * Save the subtask to the server
   */
  public saveSubtask(): void {
    this.subtask.editing = false;
    this.subtask = Subtask.fromJson(this.subtaskForm.value);
  }
}
