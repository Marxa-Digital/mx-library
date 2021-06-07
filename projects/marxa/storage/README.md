# @Marxa/Storage
Una librería pa' trepar archivos **Firesbase Storage** y para importar y exportar bases de datos a **Firesbase Firestore** desde Angular

A library to upload files to **Firesbase Storage** and import and export data bases for **Firesbase Firestore** from Angular

| :exclamation:  IMPORTANTE :exclamation:  |
|------------------------------------------|
This documentation is writed in mexican spanish for latin developers for motivate to they always read software documentation. But you always can count on the cunning of google translate XD.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

## Dependencias
Esta librería sólo chambea con [Angular Material](https://material.angular.io/) y [Angular Fire](https://github.com/angular/angularfire) para Firebase.

### Primeros pasos
Sigue los siguientes pasos para crear un proyecto que combine  **Firebase + Angular**:

1. Vete a [Firebase console](https://console.firebase.google.com/) y crea un proyecto o selecciona uno que ya hayas creado.
2. Ve las configuraciones del proyecto (*settings*) y haz scroll hasta la sección de **Firebase SDK** y selecciona la opción de configuración.
3. Copia el código que está dentro de los corchetes, las cositas curveadas **{}**.
4. Ahora ve a tu proyecto de Angular (¿No lo has hecho? Po's crea uno) y ve a la ruta `src/environments/environment.ts` y pega el código que has creado como se muestra el ejemplo de abajo.

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

5. Corre los siguientes comandos en tu consola y sigue las instrucciones de cada CLI:
  `ng add @angular/fire`
  `ng add @angular/material`

6. En `app.module.ts` inicializa tu proyecto de firebase, no se te vaya a olvidar:
```ts
import { AngularFireModule } from "@angular/fire";

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
})
export class AppModule {}
```

7. ¿Listo? ¡A huevo! Ya puedes instalar esta librería corriendo el comando `npm i @marxa/storage -s`.

8. Para usar la librería tienes que agregar el módulo de la librería al `imports` del módulo de tu proyecto de Angular donde vayas a usarlo.
```ts
import { AngularFireModule } from "@angular/fire";
import { MxStorageModule } from '@marxa/storage';

@NgModule({
  declarations: [],
  imports: [
    MxStorageModule,
    //No se te olvide inicializar tu app de AngularFire
    AngularFireModule.initializeApp(environment.firebaseConfig) 
  ],
})
export class AppModule {}
```


## Files Picker
Esta librería cuenta con un **Files Picker** donde el cliente puede dar click o arrastrar los archivos para agregarlos y luego subirlos a **Firebase Storage**. Este componente tiene la especial colaboración de [**NgxDropzone**](https://www.npmjs.com/package/ngx-dropzone)

| :exclamation:  Antes de empezar  |
|----------------------------------|
En tu proyecto de firebase, si no has creado un valde (*bucket*) pa' cargar todas las cosas, ve a la sección y pícale al botón de **Comenzar**

### Ejemplos

#### Uso básico
```html
<mx-files-picker
[maxFileSize]="2097152"
path="cosas"
prefixName="marxa-"
[metadata]="{autor: 'yomero'}"
toggleButtonLabel="Cargar archivos"
[multiple]="false"
dropzoneLabel="Toca o arrastra un archivo hasta aquí"
uploadButtonLabel="Subir"
color="primary"
></mx-files-picker>
```

#### Con modal
En veces, necesitas que el diseño no te estorbe. Para esas ocasiones puedes usar el modo **Modal** el cual tendrá el mismo efecto.

```html
<mx-files-picker
color="primary"
[openModal]="true"
></mx-files-picker>
```

#### Sin botón de subida
Cuando necesites tener control de la subida de los datos, puedes quitar el botón disparador de subida y usar el **Service** que te permita ejecutar el disparador y tener control observable del evento.

```html
<mx-files-picker
color="primary"
[uploadButton]="false"
></mx-files-picker>
```

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(
    private _storage: MxStorage
  ) { }

  onUpload(){
    this._storage.upload().subscribe( (files:iUploadedFile[]) => {
      console.log(files)
    })
  }
}

```

| :exclamation:  Importante  |
|----------------------------|
En caso de que quieras acceder a los archivos listos para subirse puedes acceder a través del servicio 

### Configuración
Ahora se muestra la tabla de opciones con las que cuenta el **Files Picker**.

| **Atributo** | **Descripción** |
|--------------|-----------------|
| @Input() path: ``string`` | Permite crear rutas o carpetas donde se guardarán los archivos |
| @Input() prefixName: ``string`` | Agrega un prefijo al nombre del archivo trepado |
| @Input() metadata?: ``Object`` | **(Opcional)** Si lo agregas, debe ser un objeto con la metadata que quieras o necesites |
| @Input() multiple: ``boolean`` | **Default: false** Permite cargar varios archivos a la vez en el Dropzone |
| @Input() maxFileSize?: ``number`` | **(Opcional)** Evita que se suban archivos muy pesados agregando los bytes que quieres limitar. Ej. 2Mb  = 2097152b |
| @Input() showDropzone: ``boolean`` = false | **Default: false** Muestra el dropzone desde un principio y omite el botón de mostrar dropzone |
| @Input() uploadButton: ``boolean`` | **Default: true** Muestra u oculta el botón disparador de subida de archivos |
| @Input() uploadStatus: ``boolean`` | **Default: true** Muestr u oculta la barra de status del archivo subido |
| @Input() toggleButtonLabel: ``string`` | **Default: 'Subir archivos'** Mensaje que se muestra en el botón que muestra el Dropzone |
| @Input() uploadButtonLabel: ``string`` | **Default: 'Subir'** Mensaje que se muestra en el botón que sube los archivos |
| @Input() dropzoneLabel: ``string`` | **Default: 'Arrastra los archivos o toca aquí'** Mensaje que se muestra dentro del Dropzone |
| @Input() disable: ``boolean`` | **Default: false** Deshabilita el botón de subida de archivos. Perfecto para validar si no se han subido archivos | 
| @Input() color: ``'primary'``, ``'accent'`` o ``'warn'`` | **Default: 'primary'** Basado en **Angular Material Color Palette** muestra el botón de subida de archivos depende el color seleccionado |
| @Input() openModal: ``boolean`` | **Default: false** Define si se abrirá el dropzone en el lugar del botón o en un modal |
| @Output() uploadComplete: ``iUploadedFile[]`` | Informa cuando terminó de subir todos los archivos y entrga un array con la información de archivos subidos. |
| @Output() onLoaded: ``void`` | Informa cuando los archivos fueron cargados en el dropzone |


## Import File
Este componente importa los datos de un archivo CSV a la base de datos de **Firestore** agregando cada fila como un documento de la colección.

| :exclamation:  Antes de empezar  |
|----------------------------------|
Si quieres que esto funcione. Debes tener inicializada tu base de datos de **Firestore** en proyecto.

| :warning: CUIDADO          |
|----------------------------|
Subir los registros de un CSV te costará 1 registro de escritura de la **Firestore** por cada 500 filas en tu documento. Peeeero...
Si mandas llamar la colección que subiste te costará **la cantidad total** de la colección de registros de lectura de la **Firestore** de los cuales 14k son gratuitos, de esa cantidad en adelante **puede costarte mucho dinero** estar llamando esta colección de documentos.


### Ejemplo de uso
Supongamos que vas a subir una lista de productos a una E-commerce. 


```html
<mx-import-file
[requiredColumns]="needColumns"
[importCol]="'productos'"
[idField]="'referencia'"
[renameColumns]="false"
></mx-import-file>
```


- Probablemente vas a necesitar validar que el archivo contenga las columnas necesarias. Para ello puedes usar `requiredColumns`.
- Probablemente vas a necesitar subirlos a una colección en específico. Para ellos, uso `importCol`.
- Probablemente necesites que una de las columnas sea usada como id de documento de **Firestore**, para ellos puedes usar `idField`. OJO: Los campos de la columna que selecciones serán transfromados a `lowerCase`, se cambiarán los espacios, comas, puntos, diagonales, arrobas y guiones medios por guiones bajos (`_`) y se omitirán comillas
- Si necesitas que las columnas cambien de nombre. Puedes usar el editor de columnas


| :eye: CUIDADO          |
|------------------------|
Los archivos deben subirse en CSV, sin filas de encabezado o títulos. La primera fila debe ser la de los nombres de las columnas.


## Exportar
Para exportar colecciones de **Firestore**a un archivo CSV, sigue los siguientes pasos:
1. Has una consulta de tu colección en **Firestore** y guárdala en un array.
2. Usa el método `downloadList`

```ts
import { AngularFirestore } from '@angular/fire/firestore';
import { MxStorage } from '@marxa/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(
    private _afs: AngularFirestore,
    private _storage: MxStorage
  ) { }

  async onDownload(){
    let list: any[] = [];
    const collection = await this._afs.collection('collection').get()
    
    // Si tu lista no es muy larga puedes usar el básico forEach
    collection.forEach(item => {
      list.push(item.data())
    })

    // De lo contrario, MxStorage cuenta con un iterador asíncrono
    await this._storage.asynForEach(list, (item: any) => {
      list.push(item.data())
    })

    this._storage.downloadList(list)
    // Esto automáticamente descargará el archivo en tu dispositivo
  }
}

```

## MODELOS MxStorage

### iUploadInfo 
Información del archivo cargado a **Firebase Storage**

| **Propiedad** | **Descripción** |
|---------------|-----------------|
| fileName?: `string` | **Optional**  Muestra el nombre con el cual fue cargado el archivo |
| uploaded?: ``Date`` | firebase.firestore.Timestamp | **Optional** Se registra como tipo `Date` pero si se carga a **Firestore** retorna como `firebase.Timestamp` |
| metadata?: ``any`` | **Optional** El objeto cargado como metadata |
| format?: ``string`` | **Optional** Formato del archivo cargado. Ejemplo: 'image/jpg' |


### iUploadedFile 
**Se extienda a `iUploadInfo`** Resultado del archivo cargado a **Firebase Storage**

|**Propiedad**|**Descripción**|
|--------------|-----------------|
| url?: ``string`` | La url con la cual acceder al archivo en **Storage**
| uploadedState?: `number` o `true` | No'más sirve para el momento de estar cargando |


## MxStorage SERVICIO

### Propiedades
|**Propiedad**|**Descripción**|
|--------------|-----------------|
| files: ``any[]`` | Los archivos que han de subirse |
| recordsLength: ``number`` | La cantidad de filas del documento CSV que se importará a **Firestore** |
| headerMap: ``Map<string, string>`` | Map de las columnas del documento CSV que se importará a **Firestore**. El primer `string` corresponde al valor original y el segundo al que se ha de transformar |
| mergeImport: ``boolean`` | **Default: true** Controla si al subir filas, el valor es `true` y el documento tiene el mismo ID, los datos del documento no se borrarán, sólo se actualizarán los campos existentes en el documento. Si no existen los creará. De lo contrario, si es `false` se borrarán los campos anteriores y se sustituirán por los nuevos. |
| RawHeaderList(): `Observable<string[]>` | Método `get` que provee un observable de la lista de nombres de las columnas del archivo CSV que se cargará. Retorna una observable con la lista de nombres de las columnas

### Observables
|**Observable**|**Descripción**|
|--------------|-----------------|
| fileUploadedStatus$:`` Subject<iUploadedFile>`` | Notifica el status del archivo que se está subiendo en el momento |
| upload$:`` Subject<void>`` | Notifica cuando cuando se ha solicitado subir los archivos |
| uploadComplete$:`` Subject<iUploadedFile[]>`` | Notifica cuando los archivos se han cargado y los muestra en un array |
| clearDropzone$:`` Subject<void>`` | Le notifica al dropzone que debe cerrarse |
| closeImportDialog$:`` Subject<void>`` | Le notifica al modal que debe cerrarse |
| closeSpinner$:`` Subject<void>`` | Le notifica al spinner que debe cerrarse |
| importState$: ``BehaviorSubject<string>`` | Notifica el estado de la importación |
| recordsReaded$: ``BehaviorSubject<number>`` | Notifica cuantos registros se han cargado a **Firestore** |

### Métodos
#### `upload()` 
Ejecuta el ciclo de subir los archivos en `MxStorage.files: any[]`


#### `uploadFile(file, path, prefixName?, metadata?): Observable<iUploadedFile>` 
Sube un único archivo y retorna un observable con el archivo cargado.

| Parámetro | Descripción|
|-----------|------------|
| file: `any` | Archivo nativo |
| path: `string` | La ruta donde será almacenada dentro del bucket de **Firebase Storage**
| prefixName: `string | null` | (Opcional) Se agrega al nombre del archivo nativo para ser guardado así. |
| metadata: `any` | (Opcional) Si este parámetro se asigna se agrega a la metadata del archivo. DEBE SER OBJETO |

####  `deleteFiles(files, path?): Promise<void> ` 
Método para eliminar archivos del **Storage** returna una promsea vacía 

| Parámetro | Descripción|
|-----------|------------|
| files: `iUploadInfo[]` | Arreglo de archivos en la forma de interface `iUploadInfo` |
| path: `string` | (Opcional) Si no se especifica, se toma de la interface `iUploadInfo`, Ruta del archivo a eliminarse |

#### `asyncForEach(array, callback): Promise<void>` 
Método para iterar arreglos de manera asíncrona. Retorna una promsea vacía 

| Parámetro | Descripción|
|-----------|------------|
| array: `any[]` | Un arreglo cualquiera |
| callbarck: `any` | Función que se realizará por cada elemento del array, Proporciona las propiedades `value` y `index` |


#### `downloadList(list, filename): Promise<void>` 
Método para descargar un array de objetos en formato CSV. Los objetos anidados obtendrán el nombre del objeto padre.hijo. Sólo permite 3 niveles de objetos anidados.

| Parámetro | Descripción|
|-----------|------------|
| list: `any[]` | Cualquier array de objetos |
| filename: `string` | Nombre del archivo al descargarse |


#### `getRawValue(value): Object` 
Método que extrae objetos anidados a un sólo objeto. Sólo permite 3 niveles de objetos anidados.

| Parámetro | Descripción|
|-----------|------------|
| value: `any` | Objeto cualquiera |


#### `importFile(collection?, idField?, mergeImport?): Promise<void>`
Método para importar archivos CSV a **Firestore**. Retorna una promsea vacía

| Parámetro | Descripción|
|-----------|------------|
| collection: `string` | (Opcional) El nombre de la colección a la que se importará. Si no se provee este parámetro se creará una colección llamada 'imports'.|
| idField: `string` | (Opcional) Nombre de la columna del archivo que servirá para marcar como id cada documento en la colección. **NOTA:** Si el id del documento resultante existe en la colección, el documento se actualizará. El id será transformado a lowerCase, cambiando espacios, puntos, comas, diagonales, arrobas y guiones medios por guiones bajos (`_`) y eliminado las comillas. |
| mergeImport: `boolean` | (Opcional, Default: `true`) Controla si al subir filas, el valor es `true` y el documento tiene el mismo ID, los datos del documento no se borrarán, sólo se actualizarán los campos existentes en el documento. Si no existen los creará. De lo contrario, si es `false` se borrarán los campos anteriores y se sustituirán por los nuevos. |



## Contacto
Email: jguzman@marxadigital.com


