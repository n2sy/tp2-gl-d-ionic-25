import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Photos } from '../services/photos';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
  standalone: false,
})
export class AddCoursePage implements OnInit {
  addForm = new FormGroup({
    title: new FormControl('title par défaut', Validators.required),
    author: new FormControl(null, Validators.required),
    logo: new FormControl(''),
    keywords: new FormControl([]),
  });
  inputKeywords = '';
  private toastCtrl = inject(ToastController);
  private actionSheetCtrl = inject(ActionSheetController);
  private photoSer = inject(Photos);
  constructor() {}

  addKeyword() {
    if (this.Keywords.indexOf(this.inputKeywords) != -1) {
      this.presentToast();
    } else {
      this.Keywords.push(this.inputKeywords);
    }
    this.inputKeywords = '';
  }
  
  deleteKeyword(keywordToDelete) {
    let i = this.Keywords.indexOf(keywordToDelete);
    this.Keywords.splice(i, 1);
  }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Ajouter une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon : 'camera',
          handler : () => {
            this.photoSer.takePicture();
          }
          
        },
        {
          text: 'Prendre une photo de la galerie',
          icon : 'image',
          handler : () => {
            
          }
        },
      
      ],
    });

    await actionSheet.present();
  }

  get Logo() {
    return this.addForm.get('logo').value;
  }
  get Keywords() {
    return this.addForm.get('keywords').value;
  }

  submitHandler() {
    console.log(this.addForm.value);
  }

  ngOnInit() {}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Mot-clé existant',
      duration: 1500,
      position: 'bottom',
      color: 'primary',
    });

    await toast.present();
  }
}
