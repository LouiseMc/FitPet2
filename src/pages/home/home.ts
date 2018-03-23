import { Component } from '@angular/core';
import { NavController,ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {DetailPage} from '../detail/detail';
import {LoginPage} from '../login/login';
import {AddDogPage} from '../add-dog/add-dog';
import {EditDogPage} from '../edit-dog/edit-dog';
import {SelectDevicePage} from '../select-device/select-device';
//import {EditDogPage} from '../edit-dog/edit-dog';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController} from 'ionic-angular';
import {Observable} from  'rxjs/Observable';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
//import {FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Dog } from '../../models/dog/dog.interface';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //songs:AngularFireList<any>;
 // songs: Observable<any>;
 //dogs: AngularFireList<any>;
 //dog = {} as Dog;
 dogRef$: FirebaseListObservable<Dog[]>

 dogListRef$: FirebaseListObservable<Dog[]>;
//dogList: AngularFireList<any>;
    
  constructor(
    public navCtrl: NavController,private database: AngularFireDatabase,public alertCtrl:AlertController,
    public authProvider: AuthProvider,
    private actionSheetCtrl: ActionSheetController) {

  

      this.dogRef$ = this.database.list('dog');
     this.dogListRef$ = this.database.list('dog');

 
  
        
    

     
      // component
//public item$: FirebaseObjectObservable<Item>;


     // this.db.database.ref
   //   this.songs = afDatabase.list('/songs').valueChanges();
  }


addDog(){

 //this.navCtrl.setRoot(AddDogPage);
  this.navCtrl.setRoot(AddDogPage);

}


// selectDog(dog: Dog)
// {

//   this.navCtrl.push(SelectDevicePage,
//                  {dogId: dog.$key });
// }


  selectDog(dog: Dog) {
    this.actionSheetCtrl.create({
       title: `${dog.name}`,
      buttons: [

        {
          text: 'Monitor Activity',
          handler: () => {
            // Send the user to the SelectDevicePage and pass the key as a parameter
            this.navCtrl.push(SelectDevicePage,
              {dogId: dog.$key });
            
           
          }
        },

        {
          text: 'Edit',
          handler: () => {
            // Send the user to the EditShoppingItemPage and pass the key as a parameter
            this.navCtrl.push(EditDogPage,
              {
             dogId: dog.$key
          //     // key: dog.$key,
          //  //    name: dog.name
          //     // dob: dog.dob,
          //     // gender:dog.gender,
          //     // breed:dog.breed,
          //     // weight:dog.weight
             }
        );
            
            /*
             Navigation stack:
             
              ['ShoppingListPage',
               'EditShoppingItemPage',
               { shoppingItemId: '-KowULdyLOK4ruWoKhws'}]
            
            */
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // Delete the current ShoppingItem, passed in via the parameter
            this.dogListRef$.remove(dog.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }
  
  async logOut(): Promise<void> {
    await this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }







}


  // scan() {
  //   this.setStatus('Scanning for Bluetooth LE Devices');
  //   this.devices = [];  // clear list

  //   this.ble.startScan([]).subscribe(
  //     device => this.onDeviceDiscovered(device), 
  //     error => this.scanError(error)
  //   );

  

  //   setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  // }

  // onDeviceDiscovered(device) {
  //   console.log('Discovered ' + JSON.stringify(device, null, 2));
  //   this.ngZone.run(() => {
  //     this.devices.push(device);
  //   });
  // }

  // If location permission is denied, you'll end up here
  // scanError(error) {
  //   this.setStatus('Error ' + error);
  //   let toast = this.toastCtrl.create({
  //     message: 'Error scanning for Bluetooth low energy devices',
  //     position: 'middle',
  //     duration: 5000
  //   });
  //   toast.present();
  // }

  // setStatus(message) {
  //   console.log(message);
  //   this.ngZone.run(() => {
  //     this.statusMessage = message;
  //   });
  // }

  // deviceSelected(device) {
  //   console.log(JSON.stringify(device) + ' selected');
  //   this.navCtrl.push(DetailPage, {
  //     device: device
  //   });
  // }

