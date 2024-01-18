import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlaca'
})
export class FilterPlacaPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!term || term === '') {
      return items;
    }
    return items.filter(item => item.placa.toLowerCase().includes(term.toLowerCase()));
  }
}