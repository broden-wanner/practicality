import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/shared/models/project';
import { Subject } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { Subtask } from 'src/app/shared/models/subtask';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  public projectForm: FormGroup;
  public project: Project;
  public newSubtaskEvent: Subject<void>;
  public isNewProject = true;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Load all the projects if they haven't been loaded already
    if (!this.projectService.allProjectsLoaded) {
      this.projectService.loadAllProjects();
    }

    // Initialize the new subtask event
    this.newSubtaskEvent = new Subject<void>();

    // If it is new, initialize an empty form. Else, get the project
    if (this.router.url.endsWith('new')) {
      this.project = new Project(null, null, '', '', '', '', '', []);
      this.projectForm = this.fb.group(this.project);
      this.isNewProject = true;
    } else {
      this.isNewProject = false;
      // Get the habit
      this.route.paramMap.subscribe((params) => {
        this.projectService.getProject(+params.get('projectId')).subscribe((project: Project) => {
          this.project = project;
          // Set the form body and subscribe to note changes
          this.projectForm = this.fb.group(this.project);
        });
      });
    }
  }

  /**
   * Creates a new project from the form and submits it to the server
   *
   * @returns {void}
   */
  public onSubmit(): void {
    const project = Project.fromJson(this.projectForm.value);
    project.subtasks = this.project.subtasks.map(Subtask.fromJson);

    // Create new project if this is for a new project, else update the project
    if (this.isNewProject) {
      this.projectService.createProject(project).subscribe(
        (success) => {
          this.toastService.sendMessage(`Created project ${this.project.title}`, 'success', 2000);
          this.router.navigate(['/projects']);
        },
        (error) => {
          console.error(error);
          this.toastService.sendMessage('Could not create project', 'danger', 2000);
        }
      );
    } else {
      this.projectService.updateProject(project).subscribe(
        (success) => {
          this.toastService.sendMessage(`Updated project ${this.project.title}`, 'success', 2000);
          this.router.navigate(['/projects']);
        },
        (error) => {
          console.error(error);
          this.toastService.sendMessage('Could not update project', 'danger', 2000);
        }
      );
    }
  }

  /**
   * Emit a signal to the subtask list to create a new subtask component
   *
   * @emits newSubtaskEvent
   * @returns {void}
   */
  public newSubtask(): void {
    this.newSubtaskEvent.next();
  }
}
