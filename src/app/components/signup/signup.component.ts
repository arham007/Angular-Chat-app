import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private _chatServices: ChatServiceService) {}

  ngOnInit(): void {}

  SignupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    confrim: new FormControl('', [Validators.required]),
  });
  onSignup() {
    let { name, email, password } = this.SignupForm.value;
    this._chatServices.SignUp(email, password, name);
  }

  get Name() {
    return this.SignupForm.controls;
  }

  get Email() {
    return this.SignupForm.controls;
  }
  get Password() {
    return this.SignupForm.controls;
  }
  get Confirm() {
    return this.SignupForm.controls;
  }

  checkPassword() {
    let pass = this.SignupForm.value.password;
    let confirm = this.SignupForm.value.confrim;
    // console.log(pass, confirm);
    return pass !== confirm ? true : false;
  }
}
