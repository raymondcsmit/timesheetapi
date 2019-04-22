import {  Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
  name: 'dayenumToArray'
})
@Injectable()
export class DayEnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}

@Pipe({
  name: 'filtercount'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    }).reduce((a, b) => a.total + b.total, 0);
   }
}