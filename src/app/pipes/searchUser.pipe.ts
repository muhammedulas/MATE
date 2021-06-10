import { Pipe, PipeTransform } from '@angular/core';
import { user } from '../models/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(array: user[], searchString: string): user[] {
    if (!array || !searchString) return array;
    else {
      return array.filter(usr => {
        usr.NAME.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
          usr.SURNAME.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
          usr.USERNAME.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
      })
    }
  }

}
