# SocialShare
Un componente que permite agregar una botonera de redes sociales en tu proyecto de angular

## Primerso pasos

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** y **Font Awesome** el cuál ya viene incluido |

## Modo de uso
Importa el módulo a tu proyecto
```ts
import { MxSocialShareModule } from "@marxa/devkit";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MxSocialShareModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ahora, agrega el componente donde lo requieras
La propiedad `social_networks` debe contener las redes que serán habilitadas.

```html
<mx-social-share 
[social_networks]="['facebook', 'twitter', 'linkedin', 'whatsapp']"
[ARTICLE_TITLE]="Hello World"
[ARTICLE_URL]="http://myapp.com/hello-world"
[MAIN_IMAGE_URL]="http://myapp.com/assets/hello-world.jpg"
></mx-social-share>
```

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.
