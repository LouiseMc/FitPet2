import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { TabsPage } from '../tabs/tabs';
import { MapPage } from '../map/map';

// Bluetooth UUIDs
const THERMOMETER_SERVICE = 'bbb0';
const TEMPERATURE_CHARACTERISTIC = 'bbb1';
const PEDOMETER_SERVICE = '1000';
const PEDOMETER_CHARACTERISTIC = '1001';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  
})
export class DetailPage {

  public LONG_SERVICE = '1002';
  public LONG_CHARACTERISTIC = '1003';
  public LAT_SERVICE = '1004';
  public LAT_CHARACTERISTIC = '1005';
  public latitude:any;
  public longitude:any;


  peripheral: any = {};
  pedometer: string;
  temperature: number;
 
  statusMessage: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private ble: BLE,
              private alertCtrl: AlertController,
              private ngZone: NgZone) {

    let device = navParams.get('device');

   this.setStatus('Connecting to ' + device.name || device.id);

   // This is not a promise, the device can call disconnect after it connects, so it's an observable
   this.ble.connect(device.id).subscribe(
     peripheral => this.onConnected(peripheral),
     peripheral => this.showAlert('Disconnected', 'The device unexpectedly disconnected')
   );

  }


  

  map(){
    this.navCtrl.push(MapPage,{
      lat: this.latitude,
      long:this.longitude});
  }
  // the connection to the peripheral was successful
 onConnected(peripheral) {

this.peripheral = peripheral;
   this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
this.startStepsNotification();
   this.startTempNotification();
   this.startLatitudeNotification();
   this.startLongitudeNotification();
    

    
  }   

  startLatitudeNotification() {
       
    this.ble.startNotification(this.peripheral.id,this.LAT_SERVICE,this.LAT_CHARACTERISTIC).subscribe((data) => {
      console.log("Latitude");
      console.log(new Float32Array(data).toString());
      this.latitude = new Float32Array(data);
    })
  }

  startLongitudeNotification() {
    this.ble.startNotification(this.peripheral.id, this.LONG_SERVICE,this.LONG_CHARACTERISTIC).subscribe((data) => {
      console.log("Longitude");
      console.log(new Float32Array(data).toString());
      this.longitude = new Float32Array(data);
    })
  }
  
  startStepsNotification() {
   this.ble.startNotification(this.peripheral.id, PEDOMETER_SERVICE, PEDOMETER_CHARACTERISTIC).subscribe(
     data => this.onPedometerChange(data), 
     () => this.showAlert('Unexpected Error', 'Failed to subscribe for pedometer changes')
   )}

  startTempNotification() {
       this.ble.startNotification(this.peripheral.id, THERMOMETER_SERVICE, TEMPERATURE_CHARACTERISTIC).subscribe(
      data => this.onTemperatureChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for temperature changes')
   )
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
    

  onTemperatureChange(buffer:ArrayBuffer) {

    // Temperature is a 4 byte floating point value
    var data = new Float32Array(buffer);
    console.log(data[0]);

    this.ngZone.run(() => {
      this.temperature = data[0];
    });

  }

  onPedometerChange(buffer:ArrayBuffer) {
    
        // Temperature is a 4 byte floating point value
        var data = new Uint32Array(buffer).toString();
        console.log(data[0]);
    
        this.ngZone.run(() => {
          this.pedometer = data[0];
        });
    
      }


  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }




  

}
