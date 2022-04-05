import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css'],
})
export class User2Component implements OnInit {
  users: Observable<any>;
  user: any;
  constructor(
    private _chatServices: ChatServiceService,
    private firestore: AngularFirestore
  ) {
    this.users = this.firestore.collection('Users').valueChanges();
    // this.users.subscribe((data) => {
    //   this._chatServices.activeRouteBehaviourSubject$.next({
    //     id: data[1].id,
    //     name: data[1].name,
    //   });
    // });
  }

  ngOnInit(): void {}
}
