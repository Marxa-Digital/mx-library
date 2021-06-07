import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
  pure: false
})
export class MxListFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if ( !items || !filter ) { return items; }
    let key = Object.keys(filter)[0]
    return items.filter( item => item[key].indexOf( filter[key] ) !== -1 );
  }

}
