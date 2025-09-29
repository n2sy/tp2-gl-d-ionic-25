import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionCourse } from '../services/gestion-course';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.page.html',
  styleUrls: ['./details-course.page.scss'],
  standalone: false,
})
export class DetailsCoursePage {
    selectedCourse : Course;
    private router = inject(Router);
    private actRoute = inject(ActivatedRoute);
    private CourseSer = inject(GestionCourse);
    private alertCtrl = inject(AlertController);
    private toastCtrl = inject(ToastController);
    
    ngOnInit() {
      this.selectedCourse = this.CourseSer.getCourseById( this.actRoute.snapshot.paramMap.get('id'));  
    }
    
    async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ce cours ?',
      buttons: ['Non', 
        {
            text : "Oui",
            handler : () => {
                this.CourseSer.deleteCourse(this.selectedCourse.id);
                this.presentToast();
                this.router.navigateByUrl("/home")
                
            }
        }
      ],
    });

    await alert.present();
  }
  
    async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Cours supprimé avec succès',
      duration: 1500,
      position: "bottom",
      color : "danger",
      
    });

    await toast.present();
  }
}
