import { Component,NgZone,ViewChild,ElementRef } from '@angular/core';
import { BLE } from '@ionic-native/ble';

import {SplashScreen} from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase/app';
import { NavController,IonicPage, NavParams,AlertController,Platform  } from 'ionic-angular';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
//  } from '@ionic-native/google-maps';
 
 


/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const LONG_SERVICE = '1002';
const LONG_CHARACTERISTIC = '1003';
const LAT_SERVICE = '1004';
const LAT_CHARACTERISTIC = '1005';



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {


  map: any
  //map: GoogleMap;
  latitude: any;
   longitude: any;




   peripheral: any = {};

  statusMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,
    private ble: BLE,private ngZone: NgZone,  private alertCtrl: AlertController,
    statusBar: StatusBar, splashScreen: SplashScreen) {
   
 
    
      let device = navParams.get('device');
      
         this.setStatus('Connecting to ' + device.name || device.id);
      
         // This is not a promise, the device can call disconnect after it connects, so it's an observable
         this.ble.connect(device.id).subscribe(
           peripheral => this.onConnected(peripheral),
           peripheral => this.showAlert('Disconnected', 'The device unexpectedly disconnected')
         );

         ''
        
         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
   
    };

    



  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  onConnected(peripheral) {
    
    this.peripheral = peripheral;
       this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
    this.startLatitudeNotification();
       this.startLongitudeNotification();
        
    
        
      }

      startLatitudeNotification() {
        this.ble.startNotification(this.peripheral.id, LAT_SERVICE, LAT_CHARACTERISTIC).subscribe((data) => {
          console.log("Latitude");
          console.log(new Float32Array(data).toString());
          this.latitude = new Float32Array(data);
        })
      }
    
      startLongitudeNotification() {
        this.ble.startNotification(this.peripheral.id, LONG_SERVICE,LONG_CHARACTERISTIC).subscribe((data) => {
          console.log("Longitude");
          console.log(new Float32Array(data).toString());
          this.longitude = new Float32Array(data);
        })
      }
      // startLatitudeNotification() {
      //   this.ble.startNotification(this.peripheral.id, LAT_SERVICE, LAT_CHARACTERISTIC).subscribe(
      //     data => this.onLatChange(data),
      //     ()=>this.showAlert('Unexpected Error', 'Failed to subscribe for latitude changes')
      //   )
      //   }
      
    
      // startLongitudeNotification() {
      //   this.ble.startNotification(this.peripheral.id, LONG_SERVICE, LONG_CHARACTERISTIC).subscribe(
      //     data => this.onLongChange(data),
      //     ()=>this.showAlert('Unexpected Error', 'Failed to subscribe for longitude changes')
      //     this.lat = new Float32Array(data);
      //   )
      //   }
      
      setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
          this.statusMessage = message;
        });
      }


      onLatChange(buffer:ArrayBuffer) {
        
            // Temperature is a 4 byte floating point value
            var data = new Uint32Array(buffer);
            console.log(data[0]);
        
            this.ngZone.run(() => {
              this.latitude = data[0];
            });
        
          }
          onLongChange(buffer:ArrayBuffer) {
            
                // Temperature is a 4 byte floating point value
                var data = new Uint32Array(buffer);
                console.log(data[0]);
            
                this.ngZone.run(() => {
                  this.longitude = data[0];
                });
            
              }

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


