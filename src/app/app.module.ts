import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MainComponent } from './components/shared/main/main.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';
import { LandingComponent } from './components/landing/landing.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TeamsComponent } from './components/admin/teams/teams.component';
import { DepartmentsComponent } from './components/admin/departments/departments.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { TasksComponent } from './components/admin/tasks/tasks.component';
import { AnnouncementsComponent } from './components/admin/announcements/announcements.component';
import { LoginComponent } from './components/login/login.component';
import { _companyComponent } from './components/_company/_company.component';
import { _dashboardComponent } from './components/_dashboard/_dashboard.component';
import { _tasksComponent } from './components/_tasks/_tasks.component';
import { _teamsComponent } from './components/_teams/_teams.component';
import { _todosComponent } from './components/_todos/_todos.component';



@NgModule({
  declarations: [
    //Common
    AppComponent,
    NavbarComponent,
    MainComponent,
    SidenavComponent,
    LandingComponent,
    LoginComponent,
    _companyComponent,
    _dashboardComponent,
    _teamsComponent,
    _tasksComponent,
    _todosComponent,
    //
    //Administration
    AdminComponent,
    UsersComponent,
    TeamsComponent,
    DepartmentsComponent,
    CompanyComponent,
    TasksComponent,
    AnnouncementsComponent
    //
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    //MatModules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    DragDropModule,
    MatTooltipModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    //
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
