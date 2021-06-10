import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: number, result?): string {
    if(value == 0) return "Beklemede";
    if(value == 1) return "Devam Ediyor";
    if(value == 2 && result == 1) return "Başarılı";
    if(value == 2 && result == 2) return "Başarısız";
    if(value == 2 && result == 3) return "İptal";
  }

}
