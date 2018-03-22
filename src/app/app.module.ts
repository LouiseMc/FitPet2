import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/ble';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import {TabsPage} from '../pages/tabs/tabs';
import { DogPage } from '../pages/dog/dog';
import { MapPage } from '../pages/map/map';
import {EditDogPage} from '../pages/edit-dog/edit-dog';
import {AddDogPage} from '../pages/add-dog/add-dog';
import {LoginPage} from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { SelectDevicePage} from '../pages/select-device/select-device';
import { FormatTemperaturePipe } from '../pipes/format-temperature/format-temperature';
import { FormatTemperatureCPipe } from '../pipes/format-temperature-c/format-temperature-c';
import { FormatTemperatureFPipe } from '../pipes/format-temperature-f/format-temperature-f';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { DatabaseserviceProvider } from '../providers/databaseservice/databaseservice';


// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
//  } from '@ionic-native/google-maps';









  // Initialize Firebase
  export const firebaseConfig = {
    apiKey: "AIzaSyDmK3bbPG5fj_gr_DbSa78smuxcaftmQnw",
    authDomain: "fitpet-de022.firebaseapp.com",
    databaseURL: "https://fitpet-de022.firebaseio.com",
    projectId: "fitpet-de022",
    storageBucket: "fitpet-de022.appspot.com",
    messagingSenderId: "766882235243"
  };



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    TabsPage,
    LoginPage,
    DogPage,
    AddDogPage,
    MapPage,
    EditDogPage,
    SignupPage,
    SelectDevicePage,
    WelcomePage,
    ResetPasswordPage,
    FormatTemperaturePipe,
    FormatTemperatureCPipe,
    FormatTemperatureFPipe
  ],
  imports: [
    BrowserModule,HttpModule,AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'bottom'})
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    TabsPage,
    MapPage,
    EditDogPage,
    AddDogPage,
    LoginPage,
    WelcomePage,
    SignupPage,
    ResetPasswordPage,
    SelectDevicePage,
    DogPage
  ],
  providers: [
     StatusBar,AuthServiceProvider,AuthProvider,
     
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE,
    AuthProvider,
    DatabaseserviceProvider
  ]
})
export class AppModule {}
