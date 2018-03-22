import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';

import { Dog } from './../../models/dog/dog.interface';
/**
 * Generated class for the EditDogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-dog',
  templateUrl: 'edit-dog.html',
})


@Injectable()
export class EditDogPage {

  private basePath: string = '/dogs';

  
  dogi: FirebaseObjectObservable<Dog> = null; //   single object

  dogSubscription: Subscription;
  dogRef$: FirebaseObjectObservable<Dog>;
  dog = {} as Dog;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,  private database: AngularFireDatabase) {

    const dogId = this.navParams.get('dogId');
    
        // Log out the NavParam
     //   console.log(dogId);
    
        // Set the scope of our Firebase Object equal to our selected dog
        this.dogRef$ = this.database.object(`dog/${dogId}`);
    
        // Subscribe to the Object and assign the result to this.dog
        this.dogSubscription =
          this.dogRef$.subscribe(
            dog => this.dog = dog);

  }


  
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<Dog> {
    const itemPath =  `${this.basePath}/${key}`;
    this.dogi = this.database.object(itemPath)
    return this.dogi
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDogPage');
  }

  editDog(dog: Dog) {
    // Update our Firebase node with new item data
    this.dogRef$.update(dog);

    // Send the user back to the HomePage
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    this.dogSubscription.unsubscribe();
  }
}
