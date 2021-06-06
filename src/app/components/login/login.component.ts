import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatGridList } from '@angular/material/grid-list';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private toast: ToastService) { }

  ngOnInit() {
  }


  login(username: string, password: string) {
    this.auth.login(username, password)
  }
  
}
