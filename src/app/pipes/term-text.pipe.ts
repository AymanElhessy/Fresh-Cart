import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
})
export class TermTextPipe implements PipeTransform {
  transform(title: string, end: number): string {
    return title.split(' ').slice(0, end).join(' ');
  }
}
