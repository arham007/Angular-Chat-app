import { Component } from '@angular/core';
import { ChatServiceService } from './services/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chatapp';
  constructor(private _chatSevices$: ChatServiceService) {}
  userOne() {
    this._chatSevices$.activeIdStateBehaviour$.next('vwU9UbqvrKRkhKVhaZfU');
  }
  userTwo() {
    this._chatSevices$.activeIdStateBehaviour$.next('WctBIa70CrLliSXahv69');
  }
  userThree() {
    this._chatSevices$.activeIdStateBehaviour$.next('WWKXvkq1t5ZLcUUXCfMF');
  }
}
