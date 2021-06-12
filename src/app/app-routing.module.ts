import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AnnouncementsComponent } from './components/admin/announcements/announcements.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { DepartmentsComponent } from './components/admin/departments/departments.component';
import { TasksComponent } from './components/admin/tasks/tasks.component';
import { TeamsComponent } from './components/admin/teams/teams.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MainComponent } from './components/shared/main/main.component';
import { _companyComponent } from './components/_company/_company.component';
import { _dashboardComponent } from './components/_dashboard/_dashboard.component';
import { _tasksComponent } from './components/_tasks/_tasks.component';
import { _teamsComponent } from './components/_teams/_teams.component';
import { _todosComponent } from './components/_todos/_todos.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', component: LandingComponent, canActivate: [AuthGuard] },
      {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
          { path: 'teams', component: TeamsComponent },
          { path: 'company', component: CompanyComponent },
          { path: 'departments', component: DepartmentsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'tasks', component: TasksComponent },
          { path: 'announcements', component: AnnouncementsComponent }
        ]
      },
      { path: 'todos', component: _todosComponent, canActivate: [AuthGuard] },
      { path: 'company', component: _companyComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: _dashboardComponent, canActivate: [AuthGuard] },
      { path: 'tasks', component: _tasksComponent, canActivate: [AuthGuard] },
      { path: 'teams', component: _teamsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
