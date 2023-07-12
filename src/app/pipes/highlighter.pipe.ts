// Adapted from https://dev.to/this-is-angular/search-and-highlight-text-feature-using-angular-l98

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: any): unknown {
    if(!args) return value;
      const re = new RegExp(args, 'igm');
      value= value.replace(re, '<span class="highlighted-text">$&</span>');
      return value;
  }

}
