import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController, ToastController, FabContainer } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { SelectStudioPage } from '../select-studio/select-studio';
import { SettingsPage } from '../settings/settings';
import { CameraService } from '../../providers/camera-service';
import { BackendService } from '../../providers/backend-service';
import { DateTimeService } from '../../providers/datetime-service';
import { AppConfig } from '../../app/app.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private patient: any;
  private name: string;
  private medicalHistory: string;
  private medicalHistoryCode: number;
  private birthdate: Date;
  private id: string;
  private healthCoverageName: string;
  private healthCoverageMember: string;
  private age: number;

  private allowDebug: boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, public app: App, 
    private cameraSvc: CameraService, private backendSvc: BackendService, 
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private dateTimeScv: DateTimeService) {

    this.patient = navParams.get('patient');
    this.medicalHistory = navParams.get('medicalHistory');
    this.medicalHistoryCode = navParams.get('medicalHistoryCode');

    this.loadPatient();

    this.allowDebug = AppConfig.allowDebug;
  }

  public takePictures(fab: FabContainer) {

    fab.close();
    this.cameraSvc.takePictures().then((uris: string[]) => {

      if(uris.length > 0) {
        this.app.getRootNav().push(SelectStudioPage, {
          medicalHistoryCode: this.medicalHistoryCode,
          imageUris: uris
        });
      }
    });
  }

  public selectFile(fab: FabContainer) {

    fab.close();
    this.cameraSvc.selectFiles().then((uri: string) => {
      let uris: string[] = [];
      uris.push(uri);
      this.app.getRootNav().push(SelectStudioPage, {
        medicalHistoryCode: this.medicalHistoryCode,
        imageUris: uris
      });
    });
  }

  public editPictures(fab: FabContainer) {

    fab.close();

    let uris: string[] = [];
    uris.push('assets/img/bugger.jpg');
    uris.push('assets/img/drink.jpg');
    uris.push('assets/img/entree.jpg');

    this.app.getRootNav().push(SelectStudioPage, {
      medicalHistoryCode: this.medicalHistoryCode,
      imageUris: uris
    });
  }

  public search() {
    this.app.getRootNav().pop();
    //this.app.getRootNav().push(SearchPage, {
    //  showBackButton: true
    //});
  }

  private loadPatient() {

    this.name = this.patient.name;
    this.medicalHistory = this.patient.medicalHistory;
    this.medicalHistoryCode = this.patient.medicaHistoryCode;
    this.birthdate = this.dateTimeScv.parseDateYYYYMMDD(this.patient.birthdate, '-');
    this.id = this.patient.id;
    this.healthCoverageName = this.patient.healthCoverage.name;
    this.healthCoverageMember = this.patient.healthCoverage.member;
    this.age = this.dateTimeScv.calculateAge(this.birthdate);

//    let loader = this.loadingCtrl.create({ content: "Aguarde por favor..." });
//    loader.present();
//
//    loader.dismiss();
//
//    this.backendSvc.searchPatients(this.medicalHistory)
//    .then((data: any[]) => {
//      loader.dismiss();
//
//      let paciente = data[0];
//      this.name = paciente.NombreCompleto;
//      this.medicalHistory = paciente.HistoriaClinica;
//      this.medicalHistoryCode = paciente.HistoriaClinicaInterna;
//      this.birthdate = this.dateTimeScv.parseDateYYYYMMDD(paciente.FechaNacimiento, '-');
//      this.id = paciente.DNI;
//      this.healthCoverageName = paciente.Cobertura;
//      this.healthCoverageMember = paciente.Afilliado;
//      this.age = this.dateTimeScv.calculateAge(this.birthdate);
//    })
//    .catch(err => {
//      loader.dismiss();
//      this.toastCtrl.create({
//        message: err,
//        duration: 3000
//      }).present();
//    });
  }

  public showSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
