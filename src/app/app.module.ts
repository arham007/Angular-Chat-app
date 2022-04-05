import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { User1Component } from './components/user1/user1.component';
import { User2Component } from './components/user2/user2.component';
import { ChatsComponent } from './components/chats/chats.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { User3Component } from './components/user3/user3.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserspanelComponent } from './components/userspanel/userspanel.component';
import { MessagepanelComponent } from './components/messagepanel/messagepanel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SentmessageboxComponent } from './sentmessagebox/sentmessagebox.component';

@NgModule({
  declarations: [
    AppComponent,
    User1Component,
    User2Component,
    ChatsComponent,
    MessagesComponent,
    User3Component,
    LoginComponent,
    SignupComponent,
    UserspanelComponent,
    MessagepanelComponent,
    SentmessageboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
