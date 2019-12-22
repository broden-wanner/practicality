import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.fb.group({ title: '', description: '', dateToComplete: '', subtasks: [] });
  }

  public onSubmit(): void {
    const project = Project.fromJson(this.projectForm.value);
    this.projectService.createProject(project).subscribe();
  }
}
