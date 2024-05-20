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
  ) {}
  title = 'testing-sso';
  async loginWithGoogle() {
    const creds = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
    const idToken = await creds.user?.getIdToken();
    console.log(idToken);
    console.log(JSON.stringify({ token: idToken, type: 'GOOGLE' }));
    // Call the API endpoint for login-social
    this.httpClient
      .post(
        'http://localhost:8801/auth/login-social',
        { token: idToken, type: 'GOOGLE' },
        this.optionsRequest(
          {
            'Content-Type': 'application/json',
          },
          false
        )
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  async loginWithMicrosoft() {
    console.log('loginWithMicrosoft');
    const creds = await this.afAuth.signInWithPopup(new OAuthProvider('microsoft.com'));
    const idToken = await creds.user?.getIdToken();
    console.log(idToken);
   
  }
  async logoutMicrosoft() {
    console.log('logoutMicrosoft');
    const creds = await this.afAuth.signOut();
    console.log(creds);
  }
  optionsRequest(
    headers: any = {},
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | '',
    body: any = null
  ) {
    const token = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbmtodGF3YWNvIiwiU29HaWF5VG8iOiIxMjM0NTY3ODMiLCJyb2xlcyI6WyJFQ1QwMDAiLCJFQ1QwMDQiLCJFQ1QwMDUiLCJFQ1QwMDYiLCJFQ1QwMDciLCJFQ1QwMDgiLCJFQ1QwMTAiLCJFQ1QwMTEiLCJFQ1QwMTIiLCJFQ1QwMTMiLCJFQ1QwMTQiLCJFQ1QwMTUiLCJFQ1QwMTYiLCJFQ1QwMjAiLCJFQ1QwMjgiLCJFQ1QwMjkiLCJFQ1QwMzAiLCJFQ1QwMzEiLCJFQ1QwMzIiLCJFQ1QwMzMiLCJFQ1QwMzQiLCJFQ1QwMzUiLCJFQ1QwMzYiLCJFQ1QwMzciLCJFQ1QwMzgiLCJFQ1QwMzkiLCJFQ1QwNDAiLCJFQ1QwNDEiLCJFQ1QwNDIiLCJFQ1QwNDMiLCJFQ1QwNDUiLCJFQ1QwNDYiLCJFQ1QwNDciLCJFQ1QwNDgiLCJFQ1QwNDkiLCJFQ1QwNTEiXSwiaXNzIjoiVk5QVCBFQ29udHJhY3QiLCJUaG9uZ1RpblRhaUtob2FuIjoiYWRtaW5raHRhd2FjbyIsIlRhaUtob2FuSWQiOjYsIlRlblRhaUtob2FuIjoiQWRtaW4ga2jDoWNoIGjDoG5nIFRhd2FjbyIsIlRyYW5nVGhhaVRUSWQiOjAsIk5ob21LaGFjaEhhbmdJZCI6MSwiR2lvaVRpbmhJZCI6MSwiSWRlbnRpZnlDb2RlIjoiPjc6N21oYWViZ2R4bXttb2M3Pzw4Nzo3TUhBRUJTR0Q3PTw8PD04PCIsIlRLS0hJRCI6NiwiTG9haUdpYXlUbyI6MSwiYXRpIjoiNDcwZGY4YjEtMzM3OS00OTJjLTk4MTAtMDEyMzBhOTIwMjRlIiwiRG9uVmlJZCI6MTAwMDE0MCwiZXhwIjoxNzE2MDI2NzMzLCJUZW5LaGFjaEhhbmciOiJDw7RuZyB0eSBj4bqlcCBuxrDhu5tjIFRhd2FjbyIsImlhdCI6MTcxNjAyMzEzMywiRGFuaFNhY2hOaG9tIjpbIkFETUlOX0tIIl0sImp0aSI6ImRhNzkzNDhmLWViM2ItNGIxZS1hZmZhLTFlZDgwMGU4N2EyMCIsIktoYWNoSGFuZ0lkIjoyfQ.xpZzcHssqO5hU4RIIysoEkv8anlErW-b2h81m1s3yUv1ujYNKa4xK7AN8NWmaeSx9gkmctuPyAxhiLRjGLzUDmfiQhzQvJm1aNMC3yo-BAf3STogQ7AvhQ_NOIhyzx3KDxZJlGYhSiMk4JBg6h4Lmfzzm-2ht8AmTyxhE5XNQhyV9z-qnbSa-VwgdFurAzWKQsXZ2fxrgf4A1TRZ9d_fQt9PivpC3rxAD3guW30bMMtU1SwlbsmC2iizkaYz1hokKJSRg6HR8jjtfOBxl-_yRilksGuMmVIL3izk0etRS2gjQ62ndnYD3nnmplGVDH_NwKinq9VzfWP93Ei5Dd_WrA';
    const header = {
      Authorization: token ? `Bearer ` + token : ``,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'Accept-Language': 'vi',
      ...headers,
    };
    const options: any = { headers: new HttpHeaders(header) };

    if (reportProgress == true) {
      options['reportProgress'] = true;
    }

    if (
      responseType != '' &&
      responseType != null &&
      responseType != undefined
    ) {
      options['responseType'] = responseType;
    }

    if (body != null) {
      options['body'] = JSON.stringify(body);
    }

    return options;
  }
}
