import { Pipe, PipeTransform } from '@angular/core';
import { task } from '../models/task';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'taskOwner'
})
export class TaskOwnerPipe implements PipeTransform {
  constructor(private auth: AuthService) { }

  transform(value: task[], createdByMe: boolean): task[] {
    if (createdByMe == true) {
      return value.filter(f => {
        f.CREATED_BY == this.auth.userName
      })
    }
    else {
      return value.filter(f => {
        f.CREATED_BY != this.auth.userName
      })
    }
  }
}
