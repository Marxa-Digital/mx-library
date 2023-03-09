import { Component, OnInit } from '@angular/core';
import { MxTextField } from '@marxa/forms';

@Component({
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  field = new MxTextField('text', 'Text');

  constructor() {}

  ngOnInit(): void {}
}
