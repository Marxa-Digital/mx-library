# @marxa/devkit
Librería de servicios auxiliares para proyectos de **Angular**.

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** y opcionalmente **@angular/fire** |
| Esta librería no funciona en proyectos de versiones anteriores a **Angular 11**, puedes usar la versión para [Angular 9](https://www.npmjs.com/package/@marxa/devkit-v9) si lo necesitas |

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

| :exclamation:  IMPORTANT :exclamation: |
|----------------------------------------|
| This documentation is writed in mexican spanish for latin developers for motivate to they always read software documentation. But you always can count on the cunning of google translate XD.|


## Instalación
Para que algunos componentes funciones, primero deberás instalar también **@angular/material**
```
ng add @angular/material
```

Para opciónes del módulo de alertas, si deseas registrar errores en producción en **Firestore** deberás instalar **@angular/fire**
Para instrucciones detalladas ve al módulo de [alertas](./src/lib/alert/README.md) 
```
ng add @angular/fire
```

### Instalación simple
Para instalación manual de la librería, puedes uar el siguiente comando
```
npm i -s @marxa/devkit 
```

### Instalación con compatibilidad
Puedes instalar también mediante `ng add` lo que también modificará y agregará algunos archivos que pueden ser de mucha utilidad.
```
ng add @marxa/devkit
```

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta opción sobreescribirá los archivos ya existentes. |

#### Arbol de archivos que se crearán o sobreescribirán
````
src 
|  app
|  | shared
|  |  | firebase.module.ts
|  |  |  marxa.module.ts
|  |  |  material.module.ts
|  |  app.component.ts
|  |  app.module.ts
|  environments
|  |  environment.ts
|  |  environment.prod.ts
|  styles.scss
````


Este comando modificará el archivo `app.component.ts` con las siguientes configuraciones por defecto:
```ts
import { Component } from '@angular/core';
import { MxAlert, MxColor, MxText } from "@marxa/devkit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _color: MxColor,
    private _text: MxText,
    private _alert: MxAlert
  ) {
    // Activa el registro de errores en una colecciónde firestore si es `true`. Recuerda que debes configurar un proyecto de firebase primero.
    this._alert.storeError = false
    // Carga la librería de íconos Font Awesome 5 Free en el head del html
    this._text.loadFontAwesome()
    // Configura la paleta de colores para la librería MxColor
    this._color.ColorPalette = {
      main: '#005daa',
      accent: '#09b8a9',
      dark1: '#00307f',
      dark2: '#001d4d',
      dark3: '#000a1a',
      ligth1: '#80aed5',
      ligth2: '#b3cee6',
      ligth3: '#e0ecf5',
    }
  }
}

```

## Módulos

Los módulos y sus documataciones se enlistan acontinuación

| Módulo | Descripción |
|--------|-------------|
| [Alert](https://github.com/jgu7man/mx-devkit/blob/main/alert/README.md) | Cuádros de diálogo de alertas para proyectos de stack **Angular/Material + Firebase** |
| [Cache](https://github.com/jgu7man/mx-devkit/blob/main/cache/README.md) | Sistema de guardado de data en Local o Session Storage con estretegias de **Promesas, Observables y suscripciones** |
| [Color](https://github.com/jgu7man/mx-devkit/blob/main/color/README.md) | Un auxilar de estilos y colores de elementos del DOM de tu aplicación. |
| [DateTime](https://github.com/jgu7man/mx-devkit/blob/main/date-time/README.md) | Servicio en desarrollo, próximamente más completo. Por ahora puedes disfrutar de algunos métodos o componentes de este módulo. |
| [Loading](https://github.com/jgu7man/mx-devkit/blob/main/loading/README.md) | Servicio que permite hacer magia en el loading de la aplicación o para optimizar las promesas |
| [Responsive](https://github.com/jgu7man/mx-devkit/blob/main/responsive/README.md) | Un servicio auxiliar de ts para cuestiones responsivas. Sí, existen las *media queries* pero a veces se necesitan acciones desde TypeScript. |
| [SEO](https://github.com/jgu7man/mx-devkit/blob/main/seo/README.md) | Un auxilar para configuración de SEO de manera reactiva. La estrategía de renderizado desde el servidor no es responsabilidad de esta librería. |
| [Text](https://github.com/jgu7man/mx-devkit/blob/main/text/README.md) | Un auxilar de métodos typescript para transformaciones de texto |

## Styles
Esta librería también cuenta con la inclusión de la librería de estilo de [materialize](http://archives.materializecss.com/0.100.2/about.html) y algunas cosas más.

De manera que puedes hacer uso de las funciones de esta librería y proximamente se publicará la documentación ofi cial aquí en esta misma.
