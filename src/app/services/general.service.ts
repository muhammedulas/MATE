import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { announcement_general } from '../models/announcement_general';
import { company } from '../models/company';
import { team } from '../models/team';
import { todo } from '../models/todo';
import { tokenResponse } from '../models/tokenResponse';
import { user } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public session = new tokenResponse();
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

  getMyTeams() {
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<team[]>('https://localhost:44335/api/getRelatedTeams/' + this.session.userId, { headers })
  }

  getUserContactInfo(id) {

    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<user>('https://localhost:44335/api/users/' + id + '?detail=true', { headers })
  }

  getTodos(){
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<todo[]>('https://localhost:44335/api/todos/' + this.session.userId, {headers})
  }

  updateTodo(todo:todo){
    let id = todo.TASKID
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(todo)
    console.log(body)
    return this.http.put<any>('https://localhost:44335/api/todos/' + id, body, {headers})
  }

  createTodo(todo){
    let auth = 'Bearer ' + this.session.access_token;
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(todo)
    return this.http.post<any>('https://localhost:44335/api/todos/', body, {headers})
  }

}
