import { Pipe, PipeTransform } from '@angular/core';
import { todo } from '../models/todo';

@Pipe({
  name: 'todoStatus'
})
export class TodoStatusPipe implements PipeTransform {

  transform(value: todo[], args: number): todo[] {

      return value.filter(q=> q.STATUS == args)
    

  }

}
