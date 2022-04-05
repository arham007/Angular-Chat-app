import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Timestamp } from 'rxjs';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  // messages: Observable<any>;
  showMessages: any;
  constructor(
    private firestore: AngularFirestore,
    private _chatServices: ChatServiceService
  ) {
    console.log(this._chatServices.activeIdStateBehaviour$.value);
    // this.messages = this.firestore
    //   .collection(
    //     `Messages/${this._chatServices.activeIdStateBehaviour$.value}/Room`
    //   )
    //   .valueChanges();
    // this.messages.subscribe((message) => {
    //   this.showMessages = message.sort((a: any, b: any) => {
    //     if (a.timestamp > b.timestamp) {
    //       return 1;
    //     } else {
    //       return -1;
    //     }
    //   });
    // });
  }

  getTime(time: any) {
    let date = new Date(time);
    let hours = date.getHours();
    let mins: any = date.getMinutes();
    if (mins > 0 && mins < 10) {
      mins = '0' + mins;
    } else {
      mins = mins;
    }
    if (hours > 12) {
      return hours - 12 + ':' + mins + ' pm';
    } else {
      return hours + ':' + mins + 'am';
    }
  }

  ngOnInit(): void {}
}
