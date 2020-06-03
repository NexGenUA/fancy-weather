import { EventEmitter } from '@angular/core';

export class SwitchDegreeService {

  switch: EventEmitter<string> = new EventEmitter<string>();

  public switchDegree(degree){
    this.switch.emit(degree);
  }

}
