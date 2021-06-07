import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MxColor {

  ColorPalette: any
  constructor () {
    this.ColorPalette = {
      primary: '',
      accent: '',
      dark: '',
      danger: '',
      bg1: '',
      bg2: '',
      bg3: '',
      complement1: '',
      complement2: '',
      complement3: '',
      complement4: ''
    }
  }

  generateRandomColor() {
    var randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );
    return randomColor;
  }

  generateHSLcolor(saturation: number, light: number) {
    return `hsl(${Math.ceil(360 * Math.random())},${saturation}%,${light}%)`;
  }

  generateBrightColor() {
    return "hsl(" + Math.ceil(360 * Math.random()) + ",60%,90%)";
  }
}
