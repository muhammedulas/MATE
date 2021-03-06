import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tokenResponse } from '../models/tokenResponse';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public session:tokenResponse = new tokenResponse();
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public userId: number = 0;
  public userName: string = "";
  public sessionInfo = new Subject<tokenResponse>();
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router

  ) {
    this.session = JSON.parse(localStorage.getItem('session'))
    localStorage.setItem('rootUrl', 'https://localhost:44335');
    this.observeSessionInfo().subscribe(session => {
      if (session) {
        if (session.isAdmin == 'true') {
          this.isAdmin = true
          this.userId = parseInt(session.userId)
          this.userName = session.userName;
        }
      }
    })
  }

  login(username: string, password: string) {
    let body = 'grant_type=password&username=' + username + '&password=' + password
    return this.http.post<tokenResponse>('https://localhost:44335/api/token', body).subscribe(res => {
      if (res.success == 'true') {
        this.isLoggedIn = true;
        if (res.isAdmin == 'true') this.isAdmin = true;
        this.toast.success_top_center('Giriş Başarılı', 3)
        localStorage.setItem('session', JSON.stringify(res))
        localStorage.setItem('token', res.access_token)
        this.sessionInfo.next(res)
        this.router.navigate(['/dashboard'])
      }
    }, err => {
      console.log(err)
      if (err.error.error_description) {
        this.toast.error_top_center(err.error.error_description, 3)
      }
      else this.toast.error_top_center(err.message, 3)
    })
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    localStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login'])

  }

  observeSessionInfo() {
    return this.sessionInfo.asObservable()
  }

}
