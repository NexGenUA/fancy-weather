import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})
export class TempPipe implements PipeTransform {

  transform(degree: number, degreeSymbol: string): number {
    if (degreeSymbol === 'f') {
      return Math.round((degree * 9) / 5 + 32);
    }

    return degree;
  }

}
