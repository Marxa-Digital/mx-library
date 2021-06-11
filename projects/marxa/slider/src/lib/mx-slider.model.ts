import { ThemePalette } from "@angular/material/core";
import { Orientation } from "./mat-carousel/carousel";

export interface MxSlide {
  imageURL: string
  activado: boolean
  nombre: string
  id?: string,
  enlace?: MxLink,
}

export interface MxLink {
  url: string,
  newTab: boolean
}


export interface MxSliderConfig {
  timings:string
  autoplay:boolean
  interval: number
  color: ThemePalette,
  maxWidth:string
  proportion: number
  slides: number
  loop: boolean
  hideArrows: boolean
  hideIndicators: boolean
  useKeyboard:boolean
  useMouseWheel:boolean
  orientation: Orientation
  maintainAspectRatio?: boolean
  slideHeight?:string
}
