import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import {MapPage} from '../map/map';
/**
 * Generated class for the SelectDevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-device',
  templateUrl: 'select-device.html',
})
export class SelectDevicePage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDevicePage');
  }


  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.startScan([]).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

  

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

 // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
   // this.navCtrl.push(DetailPage, {
    this.navCtrl.push(DetailPage, {
      device: device
    });
  }



}
