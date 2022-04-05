import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css'],
})
export class User1Component implements OnInit {
  users: Observable<any>;
  user: any;
  constructor(
    private _chatServices: ChatServiceService,
    private firestore: AngularFirestore
  ) {
    this.users = this.firestore.collection('Users').valueChanges();
    // this.users.subscribe((data) => {
    //   this._chatServices.activeRouteBehaviourSubject$.next({
    //     id: data[0].id,
    //     name: data[0].name,
    //   });
    // });
  }

  ngOnInit(): void {}
}
