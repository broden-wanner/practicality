import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPage implements OnInit {
  projects: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.loadAllProjects();
    this.projects = this.projectService.getAllProjects();
  }
}
