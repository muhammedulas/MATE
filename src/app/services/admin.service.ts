import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAnnouncement } from '../components/admin/announcements/announcements.component';
import { announcement_general } from '../models/announcement_general';
import { company } from '../models/company';
import { companyAnnouncement } from '../models/companyAnnouncement';
import { department } from '../models/department';
import { departmentAnnouncement } from '../models/departmentAnnouncement';
import { task } from '../models/task';
import { team } from '../models/team';
import { teamAnnouncement } from '../models/teamAnnouncement';
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
  //Company
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
  //Company


  //User
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

  deleteUser(id) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.delete<any>('https://localhost:44335/api/users/' + id, { headers })
  }

  createUser(user: user) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(user)
    return this.http.post<any>('https://localhost:44335/api/users', body, { headers })
  }
  //User

  //Team
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

  deleteTeam(teamId) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.delete<any>('https://localhost:44335/api/teams/' + teamId, { headers })
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
  //Team

  //Department
  getDepartments() {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<department[]>('https://localhost:44335/api/departments?detail=true', { headers })
  }

  createDepartment(dep) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(dep)
    return this.http.post<any>('https://localhost:44335/api/departments/', body, { headers })
  }

  updateDepartment(dep: department) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(dep)
    return this.http.put<any>('https://localhost:44335/api/departments/' + dep.DEPID, body, { headers })
  }

  deleteDepartment(id) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.delete<any>('https://localhost:44335/api/departments/' + id, { headers })
  }
  //Department


  //Announcement
  getAllAnnouncements() {
    let announcements = new Subject<IAnnouncement[]>();
    let temp: IAnnouncement[] = [];
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    let sTeam = this.http.get<IAnnouncement[]>('https://localhost:44335/api/announcements/team', { headers }).subscribe(res => {
      res.forEach(a => {
        a.scope = 2
        temp.push(a)
      })
      announcements.next(temp)
      sTeam.unsubscribe()
    })

    let sDep = this.http.get<IAnnouncement[]>('https://localhost:44335/api/announcements/department', { headers }).subscribe(res => {
      res.forEach(a => {
        a.scope = 1
        temp.push(a)
      })
      announcements.next(temp)
      sDep.unsubscribe()
    })

    let sComp = this.http.get<IAnnouncement[]>('https://localhost:44335/api/announcements/company', { headers }).subscribe(res => {
      res.forEach(a => {
        a.scope = 0
        temp.push(a)
      })
      announcements.next(temp)
      sComp.unsubscribe()
    })
    return announcements.asObservable()
  }

  createAnnouncement(an: IAnnouncement) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json').set('Content-Type', 'application/json')
    let body = JSON.stringify(an)

    if (an.scope == 0) {

      return this.http.post<any>('https://localhost:44335/api/announcements/company/makeAnnouncement', body, { headers })
    }
    if (an.scope == 1) {
      return this.http.post<any>('https://localhost:44335/api/announcements/department/makeAnnouncement', body, { headers })
    }
    if (an.scope == 2) {
      return this.http.post<any>('https://localhost:44335/api/announcements/team/makeAnnouncement', body, { headers })
    }

  }

  deleteAnnouncement(a: IAnnouncement) {
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    if (a.scope == 0) {
      return this.http.delete<any>('https://localhost:44335/api/announcements/company/' + a.ANNID, { headers })
    }
    if (a.scope == 1) {
      return this.http.delete<any>('https://localhost:44335/api/announcements/department/' + a.ANNID, { headers })
    }
    if (a.scope == 2) {
      return this.http.delete<any>('https://localhost:44335/api/announcements/team/' + a.ANNID, { headers })
    }
  }


  updateAnnouncement(a:IAnnouncement){
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    let body = JSON.stringify(a)
    if (a.scope == 0) {
      return this.http.put<any>('https://localhost:44335/api/announcements/company/' + a.ANNID, { headers })
    }
    if (a.scope == 1) {
      return this.http.put<any>('https://localhost:44335/api/announcements/department/' + a.ANNID, { headers })
    }
    if (a.scope == 2) {
      return this.http.put<any>('https://localhost:44335/api/announcements/team/' + a.ANNID, { headers })
    }
  }
  //Announcement

  //Task

  getAlTasks(){
    let auth = 'Bearer ' + localStorage.getItem('token')
    let headers = new HttpHeaders().set('Authorization', auth).set('Accept', 'application/json')
    return this.http.get<task[]>('https://localhost:44335/api/tasks', {headers})
  }

}
