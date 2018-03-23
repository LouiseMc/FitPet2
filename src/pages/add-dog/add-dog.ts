import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Dog } from '../../models/dog/dog.interface';

import { Subscription } from 'rxjs/Subscription';
import {Observable} from  'rxjs/Observable';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { DogPage } from '../dog/dog';
/**
 * Generated class for the EditDogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-dog',
  templateUrl: 'add-dog.html',
})
export class AddDogPage {

  dogSubscription: Subscription;
  dogRef$: FirebaseObjectObservable<Dog>;
  dogAdd$: FirebaseListObservable<Dog[]>
  dog = {} as Dog;


  constructor(public navCtrl: NavController,private database: AngularFireDatabase, public navParams: NavParams) {

    const dogId = this.navParams.get('dogId');
    console.log(dogId);

    this.dogRef$ = this.database.object(`dog/${dogId}`);

    this.dogSubscription =
    this.dogRef$.subscribe(dog => this.dog = dog);

    this.dogAdd$ = this.database.list('dog');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDogPage');
  }

  addDog(dog: Dog) {
    /*
      Create a new anonymous object and convert itemNumber to a number.
      Push this to our Firebase database under the 'shopping-list' node.
    */
    this.dogAdd$.push({
      name: this.dog.name,
      dob: this.dog.dob,
      gender:this.dog.gender,
      breed:this.dog.breed,
      weight:this.dog.weight     
    });

    // Reset our ShoppingItem
    this.dog = {} as Dog;

    // Navigate the user back to the ShoppingListPage
   // this.navCtrl.pop();
   //this.navCtrl.setRoot(TabsPage);
      this.navCtrl.setRoot(DogPage);
  }

}
