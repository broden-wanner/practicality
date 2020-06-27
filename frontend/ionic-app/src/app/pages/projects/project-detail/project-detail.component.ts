import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/shared/models/project';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  projectForm: FormGroup;
  project: Project;
  newSubtaskEvent: Subject<void>;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.newSubtaskEvent = new Subject<void>();
    this.project = new Project(null, null, '', '', '', '', '', []);
    this.projectForm = this.fb.group(this.project);
  }

  /**
   * Creates a new project from the form and submits it to the server
   */
  public onSubmit(): void {
    const project = Project.fromJson(this.projectForm.value);
    this.projectService.createProject(project).subscribe(
      (success) => this.router.navigate(['/projects']),
      (error) => {
        console.error(error);
        this.toastService.sendMessage('Could not create project', 'danger');
      }
    );
  }

  /**
   * Emit a signal to the subtask list to create a new subtask component
   */
  public newSubtask(): void {
    this.newSubtaskEvent.next();
  }
}
