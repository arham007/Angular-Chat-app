import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  public id: any;
  constructor(
    private _chatServices: ChatServiceService,
    private route: ActivatedRoute
  ) {
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });
  }

  ngOnInit(): void {}

  // sendMessage() {
  //   this._chatServices.addMessage(
  //     this.chatBox.value.message
  //     // this._chatServices.activeRouteBehaviourSubject$.value
  //     //this._chatServices.activeRouteBehaviourSubject$.value.name
  //   );
  //   this.chatBox.reset();
  // }
}
