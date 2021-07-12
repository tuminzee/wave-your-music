import { ChangeDetectorRef, Component } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import * as copy from 'copy-to-clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url : any;

  wave: WaveSurfer = null;
  demo_url = "https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3";
  isPlay = false;

  constructor(private cdr: ChangeDetectorRef) { }

  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform',
        barWidth: 2,
        barHeight: 1, // the height of the wave
        barGap: null
      });

      this.wave.on('ready', () => {
        alert("Waveform ready");
        this.wave.play();
      });
    });
  }

  onPreviewPressed(url : string): void {
    if (!this.wave) {
      this.generateWaveform();
    }

    // this.cdr.detectChanges();

    Promise.resolve().then(() => this.wave.load(url));
  }

  onStopPressed(): void {
    this.wave.stop();
  }

  playPause() {
    if (this.wave && this.wave.isReady) {
      this.wave.playPause();
    }
  }

  copyUrl(){
    copy('https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3');
    alert('copied');
  }

}

