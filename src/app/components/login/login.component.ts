import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatServiceService } from 'src/app/services/chat-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  success: any;
  error: any;
  constructor(private _chatServices: ChatServiceService) {
    this._chatServices.loginStateBehaviour$.subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.error = false;
        this.success = true;
        setTimeout(() => {
          this._chatServices.loginStateBehaviour$.next({
            success: false,
            err: false,
          });
          this.success = false;
        }, 2000);
      }
      if (data.err) {
        this.error = true;
      }
    });
  }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  onLogin() {
    let response = this._chatServices.SignIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  get Email() {
    return this.loginForm.controls;
  }
  get Password() {
    return this.loginForm.controls;
  }
}
