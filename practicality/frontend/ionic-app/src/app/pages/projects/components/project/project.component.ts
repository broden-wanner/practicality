import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../../../../shared/models/project';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ProjectService } from '../../project.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  public newSubtaskEvent: Subject<void>;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toastService: ToastService,
    private projectService: ProjectService
  ) {
    this.newSubtaskEvent = new Subject<void>();
  }

  ngOnInit() {}

  /**
   * Presents an action sheet of options to the user
   */
  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `Project ${this.project.title}`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirmDelete();
          },
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: this.editProject,
        },
      ],
    });
    await actionSheet.present();
  }

  /**
   * Presents an alert to confirm delete
   */
  public async presentAlertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete project?',
      message: `Are you sure you want to delete the project ${this.project.title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProject();
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Emit a signal to the subtask list to create a new subtask component
   */
  public newSubtask(): void {
    this.project.collapsed = false;
    this.newSubtaskEvent.next();
  }

  /**
   * Enter the edit project page
   */
  public editProject(): void {}

  /**
   * Delete the project using the project service
   */
  private deleteProject(): void {
    this.projectService.deleteProject(this.project).subscribe(
      () => {
        this.toastService.sendMessage('Deleted project', 'success', 2000);
      },
      () => {
        this.toastService.sendMessage('Could not delete project', 'danger', 2000);
      }
    );
  }
}
