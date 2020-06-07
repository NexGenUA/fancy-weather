import { EventEmitter } from '@angular/core';

export class VolumeService {

  change: EventEmitter<number> = new EventEmitter<number>();

  public sendVol(vol: number): void {
    this.change.emit(vol);
  }

}
