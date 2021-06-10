import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { MemberRolePipe } from './pipes/MemberRole.pipe';
import { Dialog_addMemberComponent } from './components/admin/teams/dialog_addMember/dialog_addMember.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Dialog_addTeamComponent } from './components/admin/teams/dialog_addTeam/dialog_addTeam.component';
import { Dialog_confirmationComponent } from './components/commonDialogs/dialog_confirmation/dialog_confirmation.component';
import { Dialog_newUserComponent } from './components/admin/users/dialog_newUser/dialog_newUser.component';
import { Dialog_passwordComponent } from './components/admin/users/dialog_password/dialog_password.component';
import { Diaog_newDepartmentComponent } from './components/admin/departments/diaog_newDepartment/diaog_newDepartment.component';
import { Dialog_contactComponent } from './components/admin/announcements/dialog_contact/dialog_contact.component';
import { SearchUserPipe } from './pipes/searchUser.pipe';
import { TodoStatusPipe } from './pipes/todoStatus.pipe';
import { TaskStatusPipe } from './pipes/taskStatus.pipe';



@NgModule({
  declarations: [
    //Common
    AppComponent,
    NavbarComponent,
    MainComponent,
    SidenavComponent,
    LandingComponent,
    LoginComponent,
    ProfileComponent,
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
    AnnouncementsComponent,
    //

    //Dialogs
    Dialog_addMemberComponent,
    Dialog_addTeamComponent,
    Dialog_confirmationComponent,
    Dialog_newUserComponent,
    Dialog_passwordComponent,
    Diaog_newDepartmentComponent,
    Dialog_contactComponent,
    //Pipes
    MemberRolePipe,
    SearchUserPipe,
    TodoStatusPipe,
    TaskStatusPipe
    //
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
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
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //
    NgbModule

  ],
  providers: [MainComponent, 
    AuthService, TeamsComponent, 
    AdminComponent, 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  
  entryComponents: [
    Dialog_addMemberComponent,
    Dialog_addTeamComponent, 
    Dialog_confirmationComponent, 
    Dialog_newUserComponent,
    Dialog_passwordComponent,
    Dialog_contactComponent
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
