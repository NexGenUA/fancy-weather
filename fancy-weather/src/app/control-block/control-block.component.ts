import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { coordsService } from '../services/coords.services';
import { SwitchLangServices } from '../services/switch-lang.services';
import translationWeather from '../../common/translation-weather.json';
import { SwitchDegreeService } from '../services/switch-degree.service';
import { changeBackground } from '../services/change-background-url.service';
import { getWeatherService } from '../services/get-weather.service';
import { preloader } from '../../common/preloader';

@Component({
  selector: 'app-control-block',
  templateUrl: './control-block.component.html',
  styleUrls: ['./control-block.component.scss']
})
export class ControlBlockComponent implements OnInit {
  cityName: string;
  currentLanguage = 'EN';
  showList = false;
  placeholder = 'Enter city';
  lan = localStorage.getItem('lan') || 'en';
  search = 'search';
  error: string;
  fahrenheit = localStorage.getItem('fahrenheit') === 'f';
  isSpeak = false;
  msg;
  synth;
  synthLang = {
    ru: 'ru-RU',
    be: 'ru-RU',
    en: 'en-EN'
  };
  recognition: any;
  isMicOn = false;
  recognitionLang = {
    ru: 'ru-RU',
    be: 'be-BE',
    en: 'en-EN'
  };
  speechLang = this.recognitionLang[this.lan];
  recognitionEnd;
  changeLang = false;
  fromMic = false;
  lastSpeech = false;
  speechTogether = false;

  @Output() changeBackground: EventEmitter<string> = new EventEmitter<string>();
  @Input() speachText: object;

  ngOnInit(): void {
    this.change.switchLan(this.lan);
    this.currentLanguage = this.lan;
    window.onbeforeunload = () => {
      if (this.isSpeak) {
        this.stopSpeech();
      }
    };
  }

  constructor(private change: SwitchLangServices, private switchDegree: SwitchDegreeService) {
    this.change.change.subscribe(lan => {
      this.switchLan(lan);
    });
  }


  async getWeather() {
    if (this.isSpeak) {
      this.stopSpeech();
    }

    const city = this.cityName?.trim();
    const regexp = /[^\dа-яёа-зй-шы-яіў\w\s-\.\,]/gi;

    if (!city || city.length < 2 || city === 'undefined' || regexp.test(city)){
      this.error = translationWeather[this.lan].wrong;
      return;
    }

    this.error = '';
    document.getElementById('wrap-app').classList.add('change');
    const coords: any = await getWeatherService(this.cityName);

    if (coords === 404) {
      this.error = translationWeather[this.lan].error;
      document.getElementById('wrap-app').classList.remove('change');
      return;
    }

    if (coords === 500) {
      this.error = translationWeather[this.lan].lost;
      document.getElementById('wrap-app').classList.remove('change');
      return;
    }

    coordsService.setCoords(coords);
    this.change.switchLan(this.lan);
    this.cityName = '';
  }

  changeLanguage(event) {

    if (this.isSpeak) {
      this.stopSpeech();
    }

    const span = event.target;
    if (span.classList.contains('lang')) {
      const lan = span.innerHTML.toLowerCase();
      this.currentLanguage = lan;
      this.showList = false;
      this.change.switchLan(lan);
      localStorage.setItem('lan', lan);

      if (this.isMicOn) {
        this.speechLang = this.recognitionLang[this.lan];
        this.isMicOn = false;
        this.recognition.removeEventListener('end', this.recognitionEnd);
        this.recognition = null;
        this.changeLang = true;
        this.microphoneOn();
      } else {
        this.speechLang = this.recognitionLang[this.lan];
      }
    }
  }

  showListBlock() {
    this.showList = !this.showList;
  }

  async refresh() {
    const loader = preloader();
    document.getElementById('wrap-app').classList.add('change');
    const tags = localStorage.getItem('tags') || 'day, summer';
    console.log('%c%s', 'color: green; font: 1.1rem/1 Tahoma;', 'Параметры запроса картинки: ' + tags.replace(/,/g, ' '));
    const url = await changeBackground(tags);
    const getImage = await fetch(url);
    await getImage.blob();
    this.changeBackground.emit(url);
    document.getElementById('wrap-app').classList.remove('change');
    loader.remove();
  }

  switchLan(lan) {
    this.lan = lan;
    this.placeholder = translationWeather[this.lan].placeholder;
    this.search = translationWeather[this.lan].search;
    this.error = this.error ? translationWeather[this.lan].error : '';
  }

  changeDegree(degree) {
    if (this.isSpeak) {
      this.stopSpeech();
    }

    this.fahrenheit = degree !== 'c';
    localStorage.setItem('fahrenheit', degree);
    this.switchDegree.switchDegree(degree);
  }

  speechWeather() {
    if (!this.synth) {
      this.synth = speechSynthesis;
    }

    if (this.isSpeak) {
      this.stopSpeech();
      return;
    }

    const {
      temperature,
      sky,
      humidity,
      feelsLike,
      windDirection,
      windSpeed,
    }: any = this.speachText;

    let voices = [];

    const switchDegree = t => Math.round((t * 9) / 5 + 32);

    const speech = translationWeather[this.lan].speech;

    const currentTemperature = this.fahrenheit ? switchDegree(temperature) : temperature;
    const currentFeelsLike = this.fahrenheit ? switchDegree(feelsLike) : feelsLike;

    const str = `
      ${speech[0]}
      ${speech[1]} ${currentTemperature} ${speech[2]}
      ${sky}
      ${speech[3]} ${currentFeelsLike} ${speech[2]}
      ${speech[4]} ${windDirection} ${parseInt(windSpeed, 10)} ${speech[5]}
      ${speech[6]} ${humidity} ${speech[7]}
    `;

    this.msg = new SpeechSynthesisUtterance();
    this.msg.text = str;
    this.msg.volume = 1;


    if (this.speechTogether) {
      this.speechTogether = false;
      this.microphoneOn();
    }

    this.msg.onend = () => {
      this.isSpeak = false;
      this.lastSpeech = true;
      if (this.fromMic && !this.isMicOn) {
        this.microphoneOn();
      }
    };

    setTimeout(() => {
      voices = this.synth.getVoices();
      this.msg.voice = voices.find(voice => voice.lang === this.synthLang[this.lan]);
      this.isSpeak = true;
      this.synth.speak(this.msg);
    }, 100);
  }

  stopSpeech() {
    this.lastSpeech = true;
    this.synth.cancel();
    this.isSpeak = false;
  }

  microphoneOn() {
    if (this.isMicOn) {
      this.isMicOn = false;
      this.recognition.stop();
      this.recognition.removeEventListener('end', this.recognitionEnd);
      this.recognition = null;
      this.fromMic = false;
      return;
    }

    window.SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 20;
    this.recognition.lang = this.speechLang;

    const result = new Set();

    this.recognition.addEventListener('result', e => {
      [...e.results].forEach(el => {
        if (el.isFinal) {
          [...el].forEach(key => {
           result.add(key.transcript.toLowerCase());
          });
        }
      });
    });

    if (this.changeLang) {
      this.changeLang = false;
    } else {
      this.recognition.start();
    }

    this.recognition.addEventListener('speechstart', () => {
    });

    this.recognitionEnd = () => {
      if (this.isSpeak) {
        if (this.isMicOn) {
          this.recognition.start();
        }
        return;
      }

      if ([...result].some(el => {
        const inc = (el as string).toLowerCase();
        const code = translationWeather[this.lan].codePhrase.toLowerCase();
        return inc.includes(code);
      })) {
        this.speechTogether = true;
        this.isMicOn = false;
        this.speechWeather();
        return;
      }

      if (this.isMicOn) {
        this.recognition.start();

        if (this.lastSpeech) {
          this.lastSpeech = false;
          result.clear();
          return;
        }

        const city = ([...result][0] as string);
        if (city || city?.length > 1) {
          this.cityName = city;
          this.getWeather();
        }
      }
      result.clear();
    };

    this.recognition.addEventListener('end', this.recognitionEnd.bind(this));
    this.isMicOn = true;
    this.fromMic = true;
  }
}
