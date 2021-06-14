import { Component, ViewChild } from '@angular/core';
import { MxAlert } from '@marxa/devkit';
import { MxCrudPanel } from 'projects/marxa/crud-panel/src/public-api';
import { MxColor } from 'projects/marxa/devkit/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marxa-devs';

  constructor(
    public alert: MxAlert,
    private _color: MxColor
  ) {
    this._color.ColorPalette = {
      main: '#005daa'
    }
  }

}
