import { Component,NgZone,ViewChild} from '@angular/core';
import { BLE } from '@ionic-native/ble';
import {SplashScreen} from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase/app';
import { NavController,IonicPage, NavParams,AlertController,Platform,ToastController  } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  MyLocation,
  GoogleMapsAnimation,
  Marker
 } from '@ionic-native/google-maps';
 

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {




  mapReady: boolean = false;
  map: GoogleMap;

 
 public latitude;
 public longitude;
  //private latitude = latitude.latitude;
  //private longitude=longitude.longitude;

   

  statusMessage: string;
  marker: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    private googleMaps: GoogleMaps,public navParams: NavParams,public platform: Platform,
    private ble: BLE,private ngZone: NgZone,  private alertCtrl: AlertController,
    statusBar: StatusBar, splashScreen: SplashScreen) {


       this.latitude = navParams.get("lat"); 
    this.longitude = navParams.get("long");

      platform.ready().then(() => {
        this.loadMap();
      });
   
         
        
         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

   
    }

    loadMap() {
      // Create a map after the view is loaded.
      // (platform is already ready in app.component.ts)
      this.map = this.googleMaps.create('map_canvas', {
        camera: {
          target: {
            lat:52.674782,
            lng:-8.666482
          },
          zoom: 18,
          tilt: 30
        }
      });
  
      // Wait the maps plugin is ready until the MAP_READY event
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.mapReady = true;
      });
    }

    onButtonClick() {
      if (!this.mapReady) {
        this.showToast('map is not ready yet. Please try again.');
        return;
      }
      this.map.clear();
  
      // Get the location of you
      this.map.getMyLocation()
        .then((location: MyLocation) => {
          console.log(JSON.stringify(location, null ,2));
  
          // Move the map camera to the location with animation
          return this.map.animateCamera({
            target: location.latLng,
            zoom: 17,
            tilt: 30
          }).then(() => {
            // add a marker
            return this.map.addMarker({

              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE
            });
          })
        }).then((marker: Marker) => {
          // show the infoWindow
          marker.showInfoWindow();
  
          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.showToast('clicked!');
          });
        });
    }
  
    showToast(message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle'
      });
  
      toast.present(toast);
    }
  

    
      // startLatitudeNotification() {
      //   this.ble.startNotification(this.peripheral.id, LAT_SERVICE, LAT_CHARACTERISTIC).subscribe(
      //     data => this.onLatChange(data),
      //     ()=>this.showAlert('Unexpected Error', 'Failed to subscribe for latitude changes')
      //   )
      //   }
      
    
    
    

      // onLatChange(buffer:ArrayBuffer) {
        
      //       // Temperature is a 4 byte floating point value
      //       var data = new Uint32Array(buffer).toString();
      //       console.log(data[0]);
        
      //       this.ngZone.run(() => {
      //         this.lat = data[0];
      //       });
        
      //     }
        
          // onLongChange(buffer:ArrayBuffer) {
            
          //       // Temperature is a 4 byte floating point value
          //       var data = new Uint32Array(buffer).toString();
          //       console.log(data[0]);
            
          //       this.ngZone.run(() => {
          //         this.long = data[0];
          //       });
            
          //     }

            

    }


