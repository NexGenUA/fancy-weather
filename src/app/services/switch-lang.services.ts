import { EventEmitter } from '@angular/core';

export class SwitchLangServices {

  change: EventEmitter<string> = new EventEmitter<string>();

  public switchLan(lan){
    this.change.emit(lan);
  }

}
