import { Pipe, PipeTransform } from '@angular/core';
import { Mixer } from '../models/mixer';

@Pipe({
  name: 'duplicates',
})
export class DuplicatesPipe implements PipeTransform {
  transform(mixers: Mixer[], args?: any): any {
    // Remove the duplicate elements (this will remove duplicates
    let uniqueArray = mixers.filter(function (
      el: any,
      index: any,
      array: string | any[]
    ) {
      return array.indexOf(el) == index;
    });

    return uniqueArray;
  }
}
