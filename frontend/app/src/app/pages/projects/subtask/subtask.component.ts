import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Subtask } from 'src/app/shared/models/subtask';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  subtaskForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private elementRef: ElementRef) {}

  ngOnInit() {
    this.subtaskForm = this.fb.group(this.subtask);
  }

  /**
   * Toggles the subtask completion state and puts the new subtask to the server
   * @param subtask - the subtask to check
   */
  public checkSubtask(): void {
    this.subtask.completed = !this.subtask.completed;
    this.projectService.updateSubtask(this.subtask).subscribe();
  }

  /**
   * Enters the subtask into editing mode
   */
  public enterEdit(): void {
    this.subtask.editing = true;
    // Focus on the input element
    setTimeout(() => {
      const nameInput = this.elementRef.nativeElement.querySelector('input[type="text"]');
      nameInput.focus();
    }, 100);
  }

  /**
   * Save the subtask to the server. Either updates or creates a new subtask
   * depending on the id of the subtask.
   */
  public saveSubtask(): void {
    this.subtask.editing = false;
    this.subtask = Subtask.fromJson(this.subtaskForm.value);
    // If there is no id, then create a new subtask
    if (this.subtask.id) {
      // Simply update the subtask
      this.projectService.updateSubtask(this.subtask).subscribe();
    } else {
      // Create a new subtask and set this one to be the returned subtask
      this.projectService.createSubtask(this.subtask).subscribe(newSubtask => {
        this.subtask.setEqualTo(newSubtask);
      });
    }
  }

  /**
   * Delete the subtask from the component
   */
  public deleteSubtask(): void {
    this.projectService.deleteSubtask(this.subtask).subscribe();
  }
}
