import { Component } from '@angular/core';
import { MxAlert } from '@marxa/devkit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marxa-devs';
  constructor(
    public alert: MxAlert
  ) { }

}
