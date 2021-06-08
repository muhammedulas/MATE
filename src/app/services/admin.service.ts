import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { company } from '../models/company';
import { department } from '../models/department';
import { team } from '../models/team';
import { tokenResponse } from '../models/tokenResponse';
import { user } from '../models/user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private session = new tokenResponse();
  constructor(private http: HttpClient, private authSvc: AuthService) {

  }

  getCompanyInfo() {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    return this.http.get<company>('https://localhost:44335/api/companies/1', { headers })
  }


  updateCompanyInfo(comp: company) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(comp)
    console.log(headers)
    return this.http.put<any>('https://localhost:44335/api/companies/' + comp.COMPID, body, { headers })
  }

  getUsers() {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<user[]>('https://localhost:44335/api/users?detail=true', { headers })
  }

  updateUser(user: user) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(user)
    return this.http.put<any>('https://localhost:44335/api/users/' + user.USERID, body, { headers })
  }

  getTeams() {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<team[]>('https://localhost:44335/api/teams?detail=true', { headers })
  }

  removeUser(teamId: number, userId: number) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.delete<any>('https://localhost:44335/api/teams/' + teamId + '/dismissUser(' + userId + ')', { headers })
  }

  getTeam(id: number) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<team>('https://localhost:44335/api/teams/' + id + '/?detail=true', { headers })
  }

  createTeam(team: team) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(team)
    return this.http.post<any>('https://localhost:44335/api/teams', body, { headers })
  }

  deleteTeam(teamId){
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.delete<any>('https://localhost:44335/api/teams/' + teamId , { headers })
  }

  updateTeam(team: team) {
    delete team.MEMBER_COUNT;
    delete team.MEMBERS;
    let body = JSON.stringify(team)
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    return this.http.put<any>('https://localhost:44335/api/teams/' + team.TEAMID, body, { headers })
  }

  addMember(tId, uId, Role) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.post<any>('https://localhost:44335/api/teams/' + tId + '/addUser(' + uId + ',' + Role + ')', '', { headers })
  }


  getDepartments() {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<department[]>('https://localhost:44335/api/departments', { headers })
  }

}
