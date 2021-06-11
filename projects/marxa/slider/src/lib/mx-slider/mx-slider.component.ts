import { Component, Input, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MxSlider } from '../mx-slider.service';
import { Router } from '@angular/router';
import { MxSlide, MxSliderConfig } from '../mx-slider.model';

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
    public _slider: MxSlider,
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
