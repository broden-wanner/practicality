import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibraryService } from '../library.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      library_file: [''],
    });
  }

  public onChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('library_file').setValue(file);
    }
  }

  /**
   * Upload the file and any metadata set with it
   */
  public onSubmit(): void {
    const formData = new FormData();
    formData.append('library_file', this.form.get('library_file').value);
    formData.append('name', this.form.get('name').value);
    formData.append('description', this.form.get('description').value);

    this.libraryService.upload(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        this.toastService.sendMessage(err.message, 'danger', 2000);
      }
    );
  }
}
