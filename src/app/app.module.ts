import {NgModule, APP_INITIALIZER, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {BrowserModule} from '@angular/platform-browser';
import {IonicStorageModule} from '@ionic/storage';
import {DragulaModule} from 'ng2-dragula';

import {DelayDragDirective} from "../directives/delay-drag.directive";

import {HttpModule} from '@angular/http';
import {HttpInterceptorModule} from 'angular2-http-interceptor';
import {HttpInterceptor} from 'angular2-http-interceptor';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {LoggingHttpInterceptor} from '../providers/logging-httpinterceptor';
import {SentryErrorHandler} from '../providers/sentry-errorhandler';

import {SelectAlertless} from '../components/select-alertless/select-alertless';
import {OrderByPipeModule} from '../pipes/orderby';

import {MyApp} from './app.component';

// import services
import {BackendService} from '../providers/backend-service';
import {CameraService} from '../providers/camera-service';
import {ImagesService} from '../providers/images-service';
import {DateTimeService} from '../providers/datetime-service';
import {ConfigLoaderService} from '../providers/config-loader-service';
// end import services

// import pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MainTabsPage} from '../pages/main-tabs/main-tabs';
import {SearchPage} from '../pages/search/search';
import {WelcomePage} from '../pages/welcome/welcome';
import {SelectStudioPage} from '../pages/select-studio/select-studio';
import {EditPhotoPage} from '../pages/edit-photo/edit-photo';
import {StudiosPage} from '../pages/studios/studios';
import {SettingsPage} from '../pages/settings/settings';
// end import pages

export function loadConfiguration(configLoaderSvc: ConfigLoaderService): () => Promise<any> {
  return () => configLoaderSvc.load();
}

@NgModule({
  declarations: [
    MyApp,
    DelayDragDirective,
    HomePage,
    LoginPage,
    MainTabsPage,
    SearchPage,
    WelcomePage,
    SelectStudioPage,
    EditPhotoPage,
    SettingsPage,
    StudiosPage,
    SelectAlertless
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
        platforms: {
          android: {
            tabsPlacement: 'top',
            tabsLayout: 'title-hide'
          },
          windows: {
            tabsLayout: 'title-hide'
          }
        }
      }
    ),
    IonicStorageModule.forRoot(),
    DragulaModule,
    IonicImageViewerModule,
    HttpInterceptorModule.withInterceptors([{
      deps: [],
      provide: HttpInterceptor,
      useClass: LoggingHttpInterceptor,
      multi: true
    }]),
    OrderByPipeModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainTabsPage,
    SearchPage,
    WelcomePage,
    SelectStudioPage,
    EditPhotoPage,
    SettingsPage,
    StudiosPage
  ],
  providers: [
    BackendService,
    CameraService,
    ImagesService,
    DateTimeService,
    ConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigLoaderService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    }
  ]
})
export class AppModule {
}
/*
 {
 platforms: {
 android: {
 tabbarLayout: 'title-hide'
 },
 windows: {
 tabbarLayout: 'title-hide'
 }
 }
 }
 */
