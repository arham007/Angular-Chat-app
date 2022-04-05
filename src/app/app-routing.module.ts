import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { User1Component } from './components/user1/user1.component';
import { User2Component } from './components/user2/user2.component';
import { User3Component } from './components/user3/user3.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatsComponent } from './components/chats/chats.component';
import { MessagepanelComponent } from './components/messagepanel/messagepanel.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [
  { path: 'user1', component: User1Component },
  { path: 'user2', component: User2Component },
  { path: 'user3', component: User3Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'messages', component: MessagepanelComponent },
  {
    path: '',
    component: ChatsComponent,
    canActivate: [AuthGuard],
    children: [{ path: ':id', component: MessagepanelComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
