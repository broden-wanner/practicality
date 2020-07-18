import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Subtask } from 'src/app/shared/models/subtask';
import { ProjectService } from '../../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/models/project';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
})
export class SubtaskComponent implements OnInit {
  @Input() forNewProject: boolean;
  @Input() subtask: Subtask;
  @Input() project: Project;
  subtaskForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subtaskForm = this.fb.group({
      id: this.subtask.id,
      name: this.subtask.name,
      completed: this.subtask.completed,
      dateToComplete: [this.subtask.dateToComplete, Validators.required],
      project: this.subtask.project,
    });
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
    // Must be on a timeout to wait for the input to appear
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
    this.subtask.setEqualTo(Subtask.fromJson(this.subtaskForm.value));

    // If this subtask is for a new project, only add it to the subtask array of the project
    if (this.forNewProject) {
      return;
    }

    // If there is no id, then create a new subtask
    if (this.subtask.id) {
      // Simply update the subtask
      this.projectService.updateSubtask(this.subtask).subscribe(
        () => {},
        (error) => {
          console.error(error);
          this.toastService.sendMessage('Error while updating', 'danger');
        }
      );
    } else {
      // Create a new subtask and set this one to be the returned subtask
      this.projectService.createSubtask(this.subtask).subscribe(
        (newSubtask) => {
          this.subtask.setEqualTo(newSubtask);
        },
        (error) => {
          console.error(error);
          this.toastService.sendMessage('There was an error, please try again', 'danger', 2000);
        }
      );
    }
  }

  /**
   * Delete the subtask from the component
   */
  public deleteSubtask(): void {
    this.projectService.deleteSubtask(this.subtask).subscribe();
  }
}
