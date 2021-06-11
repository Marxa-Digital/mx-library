import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
// import { GdevAlert } from '../alert/alert.service';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { ThemePalette } from '@angular/material/core';
import { Orientation } from './mat-carousel/carousel';
import { MxSlide, MxSliderConfig } from './mx-slider.model';

@Injectable({
  providedIn: 'root'
})
export class MxSlider {


  sliderConfig: MxSliderConfig = {
    timings: "250ms ease-in",
    autoplay : true,
    interval: 5000,
    color: "primary",
    maxWidth: "auto",
    proportion: 30,
    slides: 5,
    loop: true,
    hideArrows: false,
    hideIndicators: false,
    useKeyboard: true,
    useMouseWheel: false,
    orientation: "ltr",
    maintainAspectRatio: true,
    slideHeight:'100%'
  }

  $sliderConfig: BehaviorSubject<MxSliderConfig> = new BehaviorSubject(this.sliderConfig)
  slides$: Observable<any> = new Observable()

  constructor (
    private fs: AngularFirestore,
    private storage: AngularFireStorage,
    // private alertas: GdevAlert,
    private location: Location
  ) {
  }

  async addSlide( slide: MxSlide, collection?: string ) {
    const slidesRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'marxa-devs/slider/slides' )
    var nuSlide = await slidesRef.add( slide )
    slidesRef.doc(nuSlide.id).update({id: nuSlide.id})
    return
  }

  getSlidesList( collection?: string) {
    return this.fs.collection<MxSlide>( collection
        ? `${ collection }/slider/slides`
        : 'marxa-devs/slider/slides' )
    .valueChanges()
  }


  async loadSlides(collection?: string) {
    try {
      const sliderRef = this.fs.collection( collection
        ? `${ collection }/slider/slides`
        : 'marxa-devs/slider/slides'
      ).ref.where('activado','==', true)


      const slidesDocs = await sliderRef.get()
      const slides: any[] = []

      slidesDocs.forEach( slide => {
        slides.push(slide.data() as MxSlide)
      } )

      return slides
    } catch (error) {
      console.error
      return []
    }
  }

  async updateSlide( slide: MxSlide, collection?: string ) {
    const slidesRef = this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'marxa-devs/slider/slides' ).ref
    slidesRef.doc( slide.id ).update( slide )
    // this.alertas.sendFloatNotification('Slide modificada')
    return
  }


  async deleteSlide( slide: MxSlide, collection?: string ) {
    await this.fs.collection( collection
      ? `${ collection }/slider/slides`
      : 'marxa-devs/slider/slides' ).ref
      .doc( slide.id ).delete()
    await this.storage.storage.refFromURL( slide.imageURL ).delete()
    // this.alertas.sendFloatNotification('Se borró la slide')
    return
  }

  async loadConfiguration( collection?: string) {
    const sliderRef = this.fs.collection( collection
      ? collection : 'marxa-devs' ).ref.doc( 'slider' )
    const sliderDoc = await sliderRef.get()
    if ( sliderDoc.exists ) {
      this.$sliderConfig.next(sliderDoc.data() as MxSliderConfig)
    }

  }

  async setSliderConfiguration( config: MxSliderConfig, collection?: string ) {
    try {
      const sliderRef = this.fs.collection( collection
        ? collection : 'marxa-devs' ).ref.doc( 'slider' )
      await sliderRef.set( config, { merge: true } )
      // this.alertas.sendMessageAlert( 'Se guardó la configuración' )
      this.location.back()
      return
    } catch ( error ) {
      console.error(error);
      return
    }
  }


}
