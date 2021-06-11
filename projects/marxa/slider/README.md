# Slider
Auxiliar para agregar un slider en tu proyeto de Angular
## Primerso pasos

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** y opcionalmente **@angular/fire** |
<!-- | Esta librería no funciona en proyectos de versiones anteriores a **Angular 11**, puedes usar la versión para [Angular 9](https://www.npmjs.com/package/@marxa/devkit-v9) si lo necesitas | -->

Si deseas usar el administrador de SLIDES con **Firestore** deberás instalar **@angular/fire**

Sigue estos pasos para empezar un proyecto **Firebase -  Angular**

 1. Ve a [Firebase console](https://console.firebase.google.com/) y pícale en **Crear proyecto** o selecciona alguno que ya hayas creado.
 2. Ve a la configuración y baja a la parte **Fireabase SDK** y pícale en la opción de *Configuracion*.
 3. Copia las lineas de código que están entre los corchetes
 4. Ve a tu proyecto de Angular y entra en el archivo `src/environments/environment.ts` y pega las lineas de código en una variable nueva. El código se debe ver así:
 ```ts
 export  const  environment  =  {
	production:  false,
	firebaseConfig:  {
		apiKey:  "AIzaS++++++++++++++++++++++++++",
		authDomain:  "++++++++.firebaseapp.com",
		projectId:  "++++++++",
		storageBucket:  "+++++++++.appspot.com",
		messagingSenderId:  "0000000000",
		appId:  "1:000000000000:web:++++++++++++++",
		measurementId:  "G-++++++++++"
	}
}; 
```
 5. Corre los siguientes comandos y sigue sus respectivas instrucciones:
	 `ng add @angular/fire`
	 `ng add @angular/material`
  6. Inicializa tu proyecto de **Firebases** en `app.module.ts`:
```ts
import { AngularFireModule } from "@angular/fire";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
	 
 7. Ahora sí, ya puedes instalar esta librería `npm i -s @marxa/slider`



## Modo de uso
Importa el módulo a tu proyecto
```ts
import { MxSlider } from "@marxa/devkit";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MxSlider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Agrega el componente de vistas de slider en donde desees que aparezcan el slider. Por ejemplo la página de inicio de tu sitio.

```html
<div id="slider">
  <mx-slider [slidesCollection]="'sitio'"></mx-slider>
</div>
```

Agrega el componente de configuraciones del slider donde lo desees o necesites. Por ejemplo en algun panel de administración.
Adicionalmente puedes elegir la colección donde quires que se guarde la configuración

```html
<mx-slider-config [collection]="'sitio'"></mx-slider-config>
```

Agrega el componente de CRUD de slides donde lo necesites o elijas. Por ejemplo en el panel del adminsitración.
Puedes cambiar también adicionalmente le tamaño del CRUD que por default el de 100vh

```html
<mx-slider-crud [collection]="'sitio'" [height_vh]="100"  ></mx-slider-crud>
```



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

