import { Component, OnInit } from '@angular/core';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  constructor(public modalController: ModalController) {}

  public async openUploadModal() {
    const modal = await this.modalController.create({
      component: UploadFileComponent,
    });
    return await modal.present();
  }

  ngOnInit() {}
}
