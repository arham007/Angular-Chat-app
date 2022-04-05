import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messagepanel',
  templateUrl: './messagepanel.component.html',
  styleUrls: ['./messagepanel.component.css'],
})
export class MessagepanelComponent implements OnInit {
  messages!: Observable<any>;
  showMessages: any;
  public id: any;
  public name: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private _chatServices: ChatServiceService,
    private firestore: AngularFirestore,
    private afauth: AngularFireAuth
  ) {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.user = user?.uid;
      } else {
        this.user = null;
      }
    });
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.id = id;

      this._chatServices.activeIdStateBehaviour$.next(id);
      this._chatServices.users.subscribe((data) => {
        data.filter((item: any) => {
          if (item.id === id) {
            this.name = item.name;
          }
        });
      });

      this.firestore
        .collection('Rooms', (ref) =>
          ref
            .where(this.user, '==', true)
            .where(this._chatServices.activeIdStateBehaviour$.value, '==', true)
        )
        .valueChanges()
        .subscribe((data: any) => {
          console.log(data);
          this.firestore
            .collection(`Rooms/${data[0].id}/Messages`)
            .valueChanges()
            .subscribe((data) => (this.showMessages = data));
        });

      // console.log(id, this.user);

      // this.firestore
      //   .collection('Rooms', (ref) =>
      //     ref.where('participant', 'array-contains', this.user)
      //   )
      //   .valueChanges()
      //   .subscribe((data) => {
      //     console.log(data);
      //   });
      //   .valueChanges()
      // .subscribe((data: any) => {
      // console.log(data);
      // console.log(id);
      // this.firestore
      //   .collection(`Rooms/${data[0].id}/Messages`)
      //   .valueChanges()
      //   .subscribe((messages) => {
      //     this.showMessages = messages.sort((a: any, b: any) => {
      //       if (a.timestamp > b.timestamp) {
      //         return 1;
      //       } else {
      //         return -1;
      //       }
      //     });
      //     console.log(messages);
      // });
      // });

      // this.messageCollection = this.afs
      // .collection(`Rooms`, (ref) =>
      //   ref.where('sender', '==', 'FHb282E9jmTBE09CWVKVU6Vylll1')
      // )
      // .valueChanges()

      // .subscribe((res) => {
      //   res.forEach((item: any) => {
      //     // console.log(item.id);
      //     this.afs
      //       .collection(`Rooms/${item?.id}/Messages`)
      //       .valueChanges()
      //       .pipe(take(5))
      //       .subscribe((data) => console.log(data));
      //   });
      // });
      // this.messages = this.firestore
      //   .collection('Rooms', ref.where('sender', '==', this.user))
      //   .valueChanges();
      // this.messages.subscribe((data) => {
      //   console.log(data);
      // });
      // this.messages = this.firestore
      //   .collection('Rooms', (sa) =>
      //     sa.where('FHb282E9jmTBE09CWVKVU6Vylll1', '==', this.user)
      //   )
      //   .valueChanges();
      // this.messages.subscribe((data) => {
      //   console.log(data);
      // });
      // this.messages = this.firestore
      //   .collection(`Messages/${id}/Room`)
      //   .valueChanges();
      // this.messages.subscribe((data) => {
      //   this.showMessages = data.sort((a: any, b: any) => {
      //     if (a.timestamp > b.timestamp) {
      //       return 1;
      //     } else {
      //       return -1;
      //     }
      //   });
      //   console.log(this.showMessages[0].senderId);
      // });
    });
  }

  ngOnInit(): void {}

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
  logout() {
    this._chatServices.SignOut();
  }
}
