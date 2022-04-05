import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatServiceService } from '../services/chat-service.service';

@Component({
  selector: 'app-sentmessagebox',
  templateUrl: './sentmessagebox.component.html',
  styleUrls: ['./sentmessagebox.component.css'],
})
export class SentmessageboxComponent implements OnInit {
  constructor(private _chatServices: ChatServiceService) {}

  ngOnInit(): void {}
  messageSentForm = new FormGroup({
    message: new FormControl(''),
  });

  sentMessage() {
    this._chatServices.addMessage(this.messageSentForm.value.message);
    this.messageSentForm.reset();
  }
}
