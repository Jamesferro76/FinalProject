import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicates'
})
export class DuplicatesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
