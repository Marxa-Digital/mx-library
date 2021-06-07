import { Component, OnInit } from '@angular/core';
import { MxLoading } from './loading.service';

@Component({
  selector: 'mx-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class MxLoadingComponent implements OnInit {

  constructor(public _load: MxLoading) { }

  ngOnInit() {
  }

}
