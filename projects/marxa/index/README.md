# MxIndex (beta)
Complemento para crear listas a partir de consultas de **Firebase Firestore** en **Angular**

## Primerso pasos

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** y **@angular/fire** |
<!-- | Esta librería no funciona en proyectos de versiones anteriores a **Angular 11**, puedes usar la versión para [Angular 9](https://www.npmjs.com/package/@marxa/devkit-v9) si lo necesitas | -->

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
	 
 7. Ahora sí, ya puedes instalar esta librería `npm i -s @marxa/index`

## Modo de uso
En algún componente que necesites deberás cargar el serivicio.


```ts
import { MxIndex } from '@marxa/devkit';

export class AppComponent implements OnInit {

  products: Product[] = []
  products$: Observable<Product[]>
	constructor(
    private _index: MxIndex
  )  {}

  ngOnInit(){
    // Requiere una ruta de firestore, un selector y la cantidad por página
    this._index.initIndex( `productos`, 'id', 10 )
    // Para obtener la data puedes suscribirte a este método
    this._index.queryData.subscribe( data => {
      this.products = data
    } )
    // Podrías también acceder a la data en un observable
    this.producs$ = this._index.queryData

    // Puedes suscribirte al observable que indica cuando aún firestore apenas hace la consulta
    this._index.loadingQuery.subscribe( (loading: boolean) => {
      
    } )
    
  }

}
```




This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.
