import { Component, OnInit } from '@angular/core';
import { VolumeService } from '../services/volume.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  isVolume = false;
  level = 8;
  timeOut;

  constructor(private volChange: VolumeService) {
    volChange.change.subscribe((v: number) => {
      this.newVolume(v);
    });
  }

  ngOnInit(): void {
  }

  newVolume(vol) {
    this.isVolume = true;
    this.level = vol;

    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }

    this.timeOut = setTimeout(() => {
      this.isVolume = false;
    }, 2250);
  }
}
