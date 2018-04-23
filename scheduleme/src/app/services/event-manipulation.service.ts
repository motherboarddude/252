import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {NgModule} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { EventlistDisplayComponent } from '../eventlist-display/eventlist-display.component';
import {MatSelectModule} from '@angular/material/select';
import * as firebase from 'firebase';
import { Event } from '../objects/event';

@Injectable()
export class EventManipulationService {
  uid = null;
  db: any;
  constructor(db : AngularFireDatabase, authS : AuthService) {
    this.uid = authS.getuid();
    this.db=db;
  }
  delete(ts) {
    var item = this.db.list('Users/' + this.uid + '/events', ref =>
      ref.orderByChild('timestamp').equalTo(ts)
    );
    item.remove();
  }
  add(event : Event) {
    this.db.list('Users/' + this.uid + '/events').push(event);
  }
  update(event: Event) {
    this.delete(event.timestamp);
    this.add(event);
  }
  new_user(uid) {
    const user = this.db.object('Users/' + uid).valueChanges();
    user.subscribe(data => {
      if(data==null) {
        this.db.object('Users/' + uid).update({events: null});
        alert("New user " + uid  + "created!!");
      }
    });
  }

}