import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
    return value.toUpperCase() + ' ' + args[0].toUpperCase() + ' ' + args[1].toUpperCase();
  }

}
