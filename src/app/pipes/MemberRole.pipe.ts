import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MemberRole'
})
export class MemberRolePipe implements PipeTransform {

  transform(value: number): any {
    if(value == 2) return 'Üye'
    if(value == 1) return 'Ekip Lideri'
  }

}
