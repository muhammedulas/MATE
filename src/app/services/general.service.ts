import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { announcement_general } from '../models/announcement_general';
import { company } from '../models/company';
import { tokenResponse } from '../models/tokenResponse';
import { user } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private session = new tokenResponse();
  constructor(private http: HttpClient, private authSvc: AuthService) {
    this.authSvc.observeSessionInfo().subscribe(inf => {
      this.session = inf;
    })
  }

  getOwnInfo() {
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<user>('https://localhost:44335/api/getOwnUserInfo/' + this.session.userId, { headers })
  }

  getAnnouncements() {
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<announcement_general>('https://localhost:44335/api/getAnnouncements/' + this.session.userId, { headers })
  }

  getCompanyInfo() {
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<company>('https://localhost:44335/api/companies/1', { headers })
  }

  setPassword(pw, id) {
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    return this.http.get<any>('https://localhost:44335/api/setPassword?id=' + id + '&password=' + pw, { headers })
  }

}
