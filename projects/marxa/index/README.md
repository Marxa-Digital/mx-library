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


### Inicializa el index
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

### Controla las páginas
Puedes cargar el `index-caller` el cuál te permitirá controla el comportamiento del index y mandar a llamar más elementos de la colección

```html
  <mx-index-caller
  prevBtn="Anterior"
  nextBtn="Siguiente" 
  colorBtn="primary" 
  centerMessage="{
    showing: 'Mostrando',
    from: 'del',
    to: 'al'
  }"
  merge="false"
  (pageEvent)="$event"
  ></mx-index-caller>
```


| **Propiedad** | **Descripción** |
|---------------|-----------------|
| `@Input() prevBtn: string` | *OPCIONAL* La etiqueta que llevará el botón de página previa. DEFAULT: `Anterior` |
| `@Input() nextBtn: string` | *OPCIONAL* La etiqueta que llevará el botón de página siguiente. DEFAULT: `Siguiente`|
| `@Input() colorBtn: ThemePalette` | *OPCIONAL* El color basado en la paleta de colores de Angular Material. DEFAULT: `primary` |
| `@Input() centerMessage: mxIndexCenterMessage` | *OPCIONAL* Composición de la etiqueta central que marca el indexado. DEFAULT: `{showing: 'Mostrando', from: 'del', to: 'al'} | 
| `@Input() merge: boolean` | *OPCIONAL* Propiedad que indica si la lista indexada cargará continuamente o paginará |
| `@Output() pageEvent: EventEmitter<mxIndexEvent>` | *OPCIONAL* Emite los eventos en los cambios de  página |


### Filter component
El componente auxiliar para realizar filtrados y ordernamiento puedes trabajarlo de la siguiente manera.

```html
<mx-sort-options [fields]="['id', 'referencia']" ></mx-sort-options>
```

Este componente muestra campos de input para filtrados dinámicos. **Las búsquedas en firestore dependen de la sensibilidad a las Mayúsculas y minúsculas

| **Propiedad** | **Descripción** |
|---------------|-----------------|
| `@Input() filterByField: string` | Define un campo para hacer búsquedas por criterio. Cuando esta propiedad tiene un valor, El selector de campos desaparece. |
| `@Input() fields: string` | Arreglo de campos seleccionables para hacer filtrados u ordenamiento. Los campos deben coincidir **exactamente** con los modelos de tus documentos en firestore. |
| `@Input() sortOption: boolean` | Permite desactivar el campo de ordenamiento. DEFAULT: true |
| `@Input() filterOption: boolean` | Permite desactivar el campo de filtrado. DEFAULT: true |


## Servicio
## Propiedades
| **Propiedad** | **Descripción** |
|---------------|-----------------|
| `indexEvent: EventEmitter<mxIndexEvent>` | Emite eventos de las páginas del index |
| `queryData: Subject<any[]>` | Observable de la data obtenida por el index |
| `loadingQuery: Subject<boolean>` | Notifica cuando la consulta a firestore conmienza (`true`) y cuando termina (`false`) |
| `collection: string` | Colección de firestore a la que se hará la consulta indexada |
| `field` | Campo por default con la que se buscará en la colleción |
| `order: 'asc' | 'desc'` | Orden de la consulta |
| `criteria: string` | Criterio de comparación con el campo para hacer búsquedas filtradas |
| `mergeQuery: boolean` | Permite traer consultas mezcladas o cambiar por página |
| `queryCant: number` | Cantidad por cada consulta |



## Métodos
### Init Index
Inicializa las propiedades para la indexación. Si la colección está vacía, el parámetro `queryData` no recibe evento.

**Ejemplo**
```ts
  this.initIndex('productos', 'referencia', 20, 'desc', true)
```

| Parámetro | Descripción |
|-----------|-------------|
| `CollectionToSort: string` | Colección para hacer la consulta |
| `FieldToSort: string` | Campo para hacer las consultas |
| `queryCant: number` | Cantidad que traerá cada consulta |
| `order?: 'asc' | 'desc'` | Orden de los resultados |
| `merge?: boolean` | Mezcla o no los resultados de cada consulta que se realice |


### Change Page
Ejecuta consultas con la siguiente o la anterior cantidad configurada. Si la consulta resulta vacía, el parámetro `queryData` no recibe evento.

**Ejemplo**
```ts
this.changePage('next')
```

| Parámetro | Descripción |
|-----------|-------------|
| `direction: 'next' | 'prev'` | Colección para hacer la consulta |


### Set field to sort
Indica o cambia el campo con el que se harán las consultas

**Ejemplo**
```ts
this.setFieldtoSort('referencia')
```

| Parámetro | Descripción |
|-----------|-------------|
| `fieldSelected: MatSelectChange | string` | Campo que debe ser exacto al campo a consultar. Puede ser `string` o selección de `MatSelect` |

### Set order sort
Indica o cambia el ordenamiento de las consultas

**Ejemplo**
```ts
this.setOrderSort('asc')
```

| Parámetro | Descripción |
|-----------|-------------|
| `sortOrder: MatSelectChange | 'asc' | 'desc'` | Define el orden de las consultas. Puede ser `string` o selección de `MatSelect` |

### Set criteria filter
Indica o cambia el criterio a comparar en las consultas.

**Ejmeplo**
```ts
this.setCriteriaFilter('productName', 'referencia', 'asc' )
```

| Parámetro | Descripción |
|-----------|-------------|
| `criteria: MatSelectChange | string` | Define el criterio con el que se consultará. **ATENCIÓN** Esta propiedad es relacionado a las mayúsculas y minúsculas. Puede ser `string` o selección de `MatSelect` |
| `fieldSelected: MatSelectChange | string` | Campo que debe ser exacto al campo a consultar. |
| `sortOrder: MatSelectChange | 'asc' | 'desc'` | Define el orden de las consultas. |


## Modelos
### mxIndexAnchor

| Parámetro | Descripción |
|-----------|-------------|
| `page: number ` | Número de la página actual |
| `firstQuery: any ` | Valor del primer resultado de la página conincidente al campo  |
| `lastQuery: any ` | Valor del último resultado de la página conincidente al campo |

### mxIndexEvent

| Parámetro | Descripción |
|-----------|-------------|
| `firstIndex: any` | Primer número index en la colección de firestore completa de la página actual |
| `lastIndex: any` | Último número index en la colección de firestore completa de la página actual |
| `pageSize: number` | Cantidad del resultado de la página actual |

### mxIndexCenterMessage

| Parámetro | Descripción |
|-----------|-------------|
| `showing: string` | DEFAULT: 'Mostrando' |
| `from: string` | DEFAULT: 'del' |
| `to: string` | DEFAULT: 'al' |


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.
