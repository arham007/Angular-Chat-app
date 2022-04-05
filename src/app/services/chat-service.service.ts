import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  private messageCollection!: AngularFirestoreCollection<any>;
  private userCollection!: AngularFirestoreCollection<any>;
  users: Observable<any>;
  public id: any;
  user: any;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router
  ) {
    this.activeIdStateBehaviour$.subscribe((data) => {
      this.messageCollection = this.afs.collection(`Rooms`);
    });
    this.userCollection = this.afs.collection('Users');

    this.users = this.afs.collection('Users').valueChanges();

    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

    // console.log(this.id);
  }
  // public activeRouteBehaviourSubject$ = new BehaviorSubject<{
  //   name: string;
  //   id: string;
  // } | null>(null);
  public activeRoomBehaviourSubject$ = new BehaviorSubject('');
  public activeIdStateBehaviour$ = new BehaviorSubject('');
  public loginStateBehaviour$ = new BehaviorSubject<{
    success: Boolean;
    err: Boolean;
  }>({ success: false, err: false });

  public activeRoomIdCheckBehaviourSubject$ = new BehaviorSubject('');

  addMessage(sentMessage: string) {
    // console.log(this.activeRoomIdCheckBehaviourSubject$.value);
    // let fullMessage = {
    //   message: sentMessage,
    //   recieverId: this.activeIdStateBehaviour$.value,
    //   senderId: this.user.uid,
    //   timestamp: Date.now(),
    // };

    // this.messageCollection
    //   .doc(this.activeRoomIdCheckBehaviourSubject$.value)
    //   .collection('Messages')
    //   .add(fullMessage);
    this.afs
      .collection('Rooms', (ref) =>
        ref
          .where(this.user.uid, '==', true)
          .where(this.activeIdStateBehaviour$.value, '==', true)
      )
      .valueChanges()
      .subscribe((data: any) => {
        if (data.length >= 1) {
          let fullMessage = {
            message: sentMessage,
            loginUser: this.user.uid,
            recieverId: this.activeIdStateBehaviour$.value,
            // recieverId: this.activeIdStateBehaviour$.value,
            // senderId: this.user.uid,
            timestamp: Date.now(),
          };
          this.messageCollection
            .doc(data[0].id)
            .collection('Messages')
            .add(fullMessage);
        }
      });
    // this.afs.collection("Rooms",(ref)=> ref.where('sender',"==",))
    // console.log(this.activeRoomBehaviourSubject$.value);
    // this.activeRoomBehaviourSubject$.subscribe((roomId) => {
    //   this.users.subscribe((data) => {
    //     data.filter((item: any) => {
    //       if (item.id === this.activeIdStateBehaviour$.value) {
    //         let data = {
    //           recieverId: item.id,
    //           senderId: this.user.uid,
    //           name: item.name,
    //           message: sentMessage,
    //           timestamp: Date.now(),
    //         };
    //         console.log(roomId);
    // console.log(data);
    // this.afs
    //   .collection(
    //     'Rooms',
    //     (ref) =>
    //       ref.where('sender', '==', data.senderId) &&
    //       ref.where('reciver', '==', data.recieverId)
    //   )
    //   .valueChanges()
    //   .subscribe((data: any) => {
    //     if (data.length > 1) {
    //       this.messageCollection
    //         .doc(data[0]?.id)
    //         .collection('Messages')
    //         .add({
    //           recieverId: item.id,
    //           senderId: this.user.uid,
    //           name: item.name,
    //           message: sentMessage,
    //           timestamp: Date.now(),
    //         });
    //     } else {
    //       this.messageCollection.doc(roomId).set({
    //         id: roomId,
    //         reciver: data.recieverId,
    //         sender: data.senderId,
    //       });
    //       this.messageCollection
    //         .doc(roomId)
    //         .collection('Messages')
    //         .add({
    //           recieverId: item.id,
    //           senderId: this.user.uid,
    //           name: item.name,
    //           message: sentMessage,
    //           timestamp: Date.now(),
    //         });
    //     }
    // console.log({
    //   recieverId: item.id,
    //   senderId: this.user.uid,
    //   name: item.name,
    //   message: sentMessage,
    //   timestamp: Date.now(),
    // });
    // console.log(roomId);
    // this.messageCollection.doc(roomId).set({
    //   id: roomId,
    //   reciver: data.recieverId,
    //   sender: data.senderId,
    // });
    // });
    // this.messageCollection.doc(roomId).set({
    //   id: roomId,
    //   reciver: data.recieverId,
    //   sender: data.senderId,
    // });
    // this.messageCollection.doc(roomId).collection('Messages').add(data);
    //       }
    //     });
    //   });
    // });
    // let id = this.activeRoomBehaviourSubject$.value;
    // this.messageCollection.doc(id).set({
    //   user1: '123',
    //   user2: 'asdsad',
    // });
    // this.users.subscribe((data) => {
    //   data.filter((item: any) => {
    //     if (item.id === this.activeIdStateBehaviour$.value) {
    //       let data = {
    //         recieverId: item.id,
    //         senderId: this.user.uid,
    //         name: item.name,
    //         message: sentMessage,
    //         timestamp: Date.now(),
    //       };
    // this.messageCollection.doc(id).collection('Messages').add(data);
    // this.messageCollection
    //   .doc()
    //   .collection('Messages')
    //   .doc(this.afs.createId())
    //   .set(data, data.recieverId);
    // }
    // });
    // });
  }
  guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return s4() + s4() + '-' + s4();
  };
  SignIn(email: string, password: string) {
    this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.router.navigate(['/']);
        console.log(res);
        console.log('You are Login!!!!');
        this.loginStateBehaviour$.next({
          success: true,
          err: false,
        });
      })
      .catch((err) => {
        console.log('Error!!!', err);
        console.log(err);
        this.loginStateBehaviour$.next({
          success: false,
          err: true,
        });
      });
  }

  SignUp(email: string, password: string, name: string) {
    this.afauth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log(res.user?.uid);
        console.log('User created!!');
        let data = {
          id: res.user?.uid,
          name: name,
          email: email,
          password: password,
        };
        this.userCollection.doc(data.id).set(data);
      })
      .catch((err) => console.log('Error!!!', err));
  }

  CreateRoom() {
    this.afs
      .collection('Rooms', (ref) =>
        ref
          .where(this.user.uid, '==', true)
          .where(this.activeIdStateBehaviour$.value, '==', true)
      )
      .valueChanges()
      .subscribe((data: any) => {
        console.log(data, this.activeIdStateBehaviour$.value, this.user.uid);
        if (data.length >= 1) {
          this.activeRoomIdCheckBehaviourSubject$.next(data[0].id);
        } else {
          this.messageCollection
            .doc(this.activeRoomBehaviourSubject$.value)
            .set({
              id: this.activeRoomBehaviourSubject$.value,
              [this.user.uid]: true,
              [this.activeIdStateBehaviour$.value]: true,
            });
        }
      });
  }

  SignOut() {
    return this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn() {
    let user = localStorage.getItem('user');
    if (typeof user == 'string') {
      user = JSON.parse(user);
    }

    return user !== null ? true : false;
  }
}
