import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public sideNavActive = new Subject<boolean>();
  constructor(private auth:AuthService) {
  }

}
