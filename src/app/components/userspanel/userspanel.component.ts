import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-userspanel',
  templateUrl: './userspanel.component.html',
  styleUrls: ['./userspanel.component.css'],
})
export class UserspanelComponent implements OnInit {
  search = faSearch as IconProp;
  users: Observable<any>;
  showUsers: any;
  user: any;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private _chatServices: ChatServiceService
  ) {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.user = user?.uid;
      } else {
        this.user = null;
      }
    });
    this.users = this.afs.collection('Users').valueChanges();
    this.users.subscribe((data) => {
      this.showUsers = data.filter((item: any) => this.user !== item.id);
    });
  }

  ngOnInit(): void {}

  sendId(id: string) {
    this._chatServices.activeIdStateBehaviour$.next(id);
    this._chatServices.CreateRoom();
    this._chatServices.activeRoomBehaviourSubject$.next(
      this._chatServices.guid()
    );
  }
}
