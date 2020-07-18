import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project';
import { map, tap } from 'rxjs/operators';
import { Subtask } from 'src/app/shared/models/subtask';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects = new BehaviorSubject<Project[]>(new Array<Project>());
  private projectsArray: Array<Project>;

  constructor(private http: HttpClient) {}

  /**
   * Get the Projects from the server and load them into the subject
   */
  public loadAllProjects(): void {
    this.http.get<Project[]>(`${environment.api}/projects/`).subscribe(
      (projects) => {
        this.projectsArray = projects.map(Project.fromJson);
        this.projects.next(this.projectsArray);
      },
      (error) => {
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
    return this.http
      .get<Project>(`${environment.api}/projects/${projectId}/`)
      .pipe(map(Project.fromJson));
  }

  /**
   * Makes a POST request to the api to make a new project.
   * Once successful, add the new project to the projects array
   * @param project - the new project object
   */
  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.api}/projects/`, project).pipe(
      map(Project.fromJson),
      tap((p) => this.projectsArray.push(p))
    );
  }

  /**
   * POSTs a new subtask on an already existing project. Will throw
   * an error if the project is not defined. The caller should handle
   * the adding of the subtask to the project.
   * @param subtask - the subtask to create
   */
  public createSubtask(subtask: Subtask): Observable<Subtask> {
    return this.http
      .post<Subtask>(`${environment.api}/subtasks/`, subtask)
      .pipe(map(Subtask.fromJson));
  }

  /**
   * PUT a changed subtask to update on the server
   * @param subtask - the subtask to update
   */
  public updateSubtask(subtask: Subtask): Observable<Subtask> {
    return this.http
      .put<Subtask>(`${environment.api}/subtasks/${subtask.id}/`, subtask)
      .pipe(map(Subtask.fromJson));
  }

  /**
   * DELETE a subtask on a project on server and remove from the project array
   * @param subtask - the subtask to delete
   */
  public deleteSubtask(subtask: Subtask): Observable<any> {
    return this.http.delete<Subtask>(`${environment.api}/subtasks/${subtask.id}/`).pipe(
      tap(() => {
        // Remove the subtask from the project object on deletion
        const project = this.projectsArray.filter((p) => p.id === subtask.project)[0];
        for (let i = 0; i < project.subtasks.length; i++) {
          const s = project.subtasks[i];
          if (s.id === subtask.id && s.project === project.id) {
            // Remove the subtask from the actual project object
            project.subtasks.splice(i, 1);
            break;
          }
        }
      })
    );
  }
}
