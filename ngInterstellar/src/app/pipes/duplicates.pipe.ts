import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicates',
})
export class DuplicatesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Remove the duplicate elements (this will remove duplicates
    let uniqueArray = value.filter(function (
      el: any,
      index: any,
      array: string | any[]
    ) {
      return array.indexOf(el) == index;
    });

    return uniqueArray;
  }
}
