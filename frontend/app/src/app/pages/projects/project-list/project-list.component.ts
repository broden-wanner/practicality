import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable, Subject } from 'rxjs';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.loadAllProjects();
    this.projects = this.projectService.getAllProjects();
  }
}
