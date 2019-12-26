import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService, public toastController: ToastController) {}

  ngOnInit() {
    this.toastService.getMessages().subscribe(toast => {
      this.presentToast(toast);
    });
  }

  /**
   * Method to create the toast for the toast component
   * @param param0 - the message and color object
   */
  public async presentToast({ message, color, duration }) {
    const toast = await this.toastController.create({
      message,
      showCloseButton: true,
      color,
      position: 'bottom',
      duration
    });
    toast.present();
  }
}
