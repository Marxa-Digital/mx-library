import { Component, Input, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MxSliderService, MxSliderConfig, MxSlide } from '../mx-slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mx-slider',
  templateUrl: './mx-slider.component.html',
  styleUrls: ['./mx-slider.component.scss']
})
export class MxSliderComponent implements OnInit {
  sliderConfig: MxSliderConfig

  slides: MxSlide[] = [];
  @Input() slidesCollection: string = ''

  constructor (
    public _slider: MxSliderService,
    private router: Router
  ) {
    this.sliderConfig = this._slider.sliderConfig
   }


  ngOnInit(): void {
    this._slider.loadConfiguration(this.slidesCollection)
    this.loadSliderConfig()
    this.loadSlides()
  }

  loadSliderConfig() {
    this._slider.$sliderConfig.subscribe( config => {
      this.sliderConfig = config
    })
  }

  async loadSlides() {
    this.slides = await this._slider.loadSlides( this.slidesCollection )
  }



}
