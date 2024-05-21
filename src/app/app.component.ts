import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, OAuthProvider } from '@firebase/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient
  ) {
    this.afAuth.getRedirectResult().then(async (result) => {
      if(result.user) {
        const idToken = await result.user.getIdToken();
        console.log(idToken);
      }
    });
  }
  title = 'testing-sso';
  async loginWithGoogle() {
    await this.afAuth.signInWithRedirect(new GoogleAuthProvider())
  }
  async loginWithMicrosoft() {
    console.log('loginWithMicrosoft');
    await this.afAuth.signInWithRedirect(new OAuthProvider('microsoft.com'));
   
  }
  async logoutMicrosoft() {
    console.log('logoutMicrosoft');
    const creds = await this.afAuth.signOut();
    console.log(creds);
  }
}
