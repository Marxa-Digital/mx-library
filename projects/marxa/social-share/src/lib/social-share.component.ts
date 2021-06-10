import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'mx-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class MxSocialShareComponent implements OnInit {

  @Input() ARTICLE_TITLE: string = ''
  @Input() ARTICLE_URL: string = ''
  @Input() MAIN_IMAGE_URL: string = ''
  @Input() social_networks: string[] = []

  public urlEncoded: string = ''
  public imgEncoded: string = ''

  constructor(
    @Inject(DOCUMENT) private doc: any
  ) { }

  ngOnInit() {
    const fontawesome = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css'
    let link: HTMLLinkElement | null = document.querySelector(`[href="${fontawesome}"]`)
    if (!link) {
      link = this.doc.createElement('link') as HTMLLinkElement
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', fontawesome );
      this.doc.head.appendChild(link);
    }
  }

  onShare(social: string) {
	  this.urlEncoded = encodeURIComponent(this.ARTICLE_URL);
	  this.imgEncoded = encodeURIComponent(this.MAIN_IMAGE_URL);

    switch (social) {
      case 'facebook':
        window.open('http://www.facebook.com/sharer/sharer.php?u='+this.ARTICLE_URL, 'facebook_share')
        break;
      case 'twitter':
        window.open('http://twitter.com/share?url='+this.ARTICLE_URL, 'twitter_share')
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/shareArticle?mini=true&url='+this.urlEncoded+'&title='+this.ARTICLE_TITLE+'&summary=&source=', 'linkedin_share')
        break;
      case 'whatsapp':
        window.open('https://wa.me/?text='+encodeURIComponent(window.location.href))
        break;

      default:
        break;
    }
  }

}
