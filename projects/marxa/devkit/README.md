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

```
npm i -s @marxa/devkit 
```

Para que algunos componentes funciones deberás instalar también **@angular/material**

```
ng add @angular/material
```

Para opciónes del módulo de alertas, si deseas registrar errores en producción en **Firestore** deberás instalar **@angular/fire**
Para instrucciones detalladas ve al módulo de [alertas](./src/lib/alert/README.md) 

```
ng add @angular/fire
```


## Módulos

Los módulos y sus documataciones se enlistan acontinuación

| Módulo | Descripción |
|--------|-------------|
| [Alert](./src/lib/alert/README.md) | Cuádros de diálogo de alertas para proyectos de stack **Angular/Material + Firebase" |
| [Cache](./src/lib/cache/README.md) | Sistema de guardado de data en Local o Session Storage con estretegias de **Promesas, Observables y suscripciones** |
| [Color](./src/lib/color/README.md) | Un auxilar de estilos y colores de elementos del DOM de tu aplicación. |
| [DateTime](./src/lib/date-time/README.md) | Servicio en desarrollo, próximamente más completo. Por ahora puedes disfrutar de algunos métodos o componentes de este módulo. |
| [Loading](./src/lib/loading/README.md) | Servicio que permite hacer magia en el loading de la aplicación o para optimizar las promesas |
| [Responsive](./src/lib/responsive/README.md) | Un servicio auxiliar de ts para cuestiones responsivas. Sí, existen las *media queries* pero a veces se necesitan acciones desde TypeScript. |
| [SEO](./src/lib/seo/README.md) | Un auxilar para configuración de SEO de manera reactiva. La estrategía de renderizado desde el servidor no es responsabilidad de esta librería. |
| [Text](./src/lib/text/README.md) | Un auxilar de métodos typescript para transformaciones de texto |

## Styles
Esta librería también cuenta con la inclusión de la librería de estilo de [materialize](http://archives.materializecss.com/0.100.2/about.html) y algunas cosas más.

De manera que puedes hacer uso de las funciones de esta librería y proximamente se publicará la documentación ofi cial aquí en esta misma.
