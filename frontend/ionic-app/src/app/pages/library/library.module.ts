import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryPageRoutingModule } from './library-routing.module';

import { LibraryPage } from './library.page';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { LibraryService } from './library.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, LibraryPageRoutingModule],
  declarations: [LibraryPage, UploadFileComponent],
  providers: [LibraryService],
})
export class LibraryPageModule {}
