import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project';
import { map } from 'rxjs/operators';
import { Subtask } from 'src/app/shared/models/subtask';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects = new BehaviorSubject<Project[]>(new Array<Project>());

  constructor(private http: HttpClient) {}

  /**
   * Get the Projects from the server and load them into the subject
   */
  public loadAllProjects(): void {
    this.http.get<Project[]>('/api/projects/').subscribe(
      Projects => {
        this.projects.next(Projects.map(Project.fromJson));
      },
      error => {
        this.projects.error(error);
      }
    );
  }

  /**
   * Retuns an observable of all the available Projects
   */
  public getAllProjects(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  /**
   * Get a specific Project from the server and return an observable
   * @param projectId - the id of the Project to retrieve from the server
   */
  public getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${projectId}/`).pipe(map(Project.fromJson));
  }

  /**
   * PUT a new subtask to update on the server
   * @param subtask - the subtask to update
   */
  public updateSubtask(subtask: Subtask): Observable<Subtask> {
    return this.http.put<Subtask>(`api/subtasks/${subtask.id}/`, subtask.toJson()).pipe(map(Subtask.fromJson));
  }
}
