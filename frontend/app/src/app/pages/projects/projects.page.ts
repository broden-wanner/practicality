import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project';
import { Subtask } from 'src/app/shared/models/subtask';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPage implements OnInit {
  projects: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.loadAllProjects();
    this.projects = this.projectService.getAllProjects();
  }

  /**
   * Toggles the subtask completion state and puts the new subtask to the server
   * @param subtask - the subtask to check
   */
  public checkSubtask(subtask: Subtask): void {
    subtask.completed = !subtask.completed;
    this.projectService.updateSubtask(subtask).subscribe();
  }
}
