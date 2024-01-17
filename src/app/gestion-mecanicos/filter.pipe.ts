import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term: string): any[] {
    if (!term || term === '') {
      return items;
    }
    return items.filter(item => item.nombre.toLowerCase().includes(term.toLowerCase()));
  }
}
