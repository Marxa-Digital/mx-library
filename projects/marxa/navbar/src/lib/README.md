# MxNavbar
Template de navbar para aplicaciones de **angular**, **@angular/fire** y **marxa digital**

## Primerso pasos

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** y opcionalmente **@angular/fire** |
<!-- | Esta librería no funciona en proyectos de versiones anteriores a **Angular 11**, puedes usar la versión para [Angular 9](https://www.npmjs.com/package/@marxa/devkit-v9) si lo necesitas | -->

Si deseas elegir directamente una colección de **Firestore** deberás instalar **@angular/fire**

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
	 
 7. Ahora sí, ya puedes instalar esta librería `npm i -s @marxa/navbar`



## Modo de uso
El template puede ser montado en un componente en html.

```html
<mx-navbar
[title] = 'app-name'
[linkColor] = '#202020'
[unloggedPath] = "'/'"
[menu] = ['inicio', 'contacto']
[showSearcher] = "true"
[searchCollection] = "'collection'"
[searchTrigger] = "0"
[searcherLabel] = "'Buscador'"
[showLogzone] = "true"
[loginMethod]= "'link'"
[loginButtonLabel] = "'Ingresar'"
[loginButtonLink] = "'/'"
></mx-navbar>
```


### Propiedades

| Parámetro | Descripción |
|-----------|-------------|
| @Input() `title: string` | DEFAULT: 'app-logo'. Título que aparecerá en caso de no asignar logo. Si existe el logo, esta propiedad funciona como propiedad `alt` de la imagen. |
| @Input() `logo: string` | DEFAULT: ''. Ruta o URL de la imagen de logotipo |
| @Input() `fontColor: string` | DEFAULT: ''. Color de la fuente de la barra de navegación o panel movil. |
| @Input() `backgroundColor: string` | DEFAULT: ''. Color del fondo de la barra de navegación o panel movil. |
| @Input() `linkColor: string` | DEFAULT: '#202020'. Color de los enlaces del menú. |
| @Input() `activeLinkColor: string` | DEFAULT: '#202020'. Color del enlace activo. |
| @Input() `menu: MxNavbarMenuNode[]` | DEFAULT: []. Enlaces del menu |
| @Input() `showSearcher: boolean` | DEFAULT: false. Activa el buscador anidado |
| @Input() `searchCollection: string` | DEFAULT: ''. Colección de firestore en la cual se harán las busquedas. |
| @Input() `searchSelector: string` | DEFAULT: ''. Propiedad de los documentos de firestore con los cuales se buscará. |
| @Input() `searchTrigger: number` | DEFAULT: 0. Cantidad mínima de caracteres en el buscador para comenzar a realizar la búsqueda. |
| @Input() `searcherLabel: string` | DEFAULT: ''. Etiqueta opcional en el buscador. |
| @Input() `showLogzone: boolean` | DEFAULT: false. Activa las opciones de autenticación. |
| @Input() `loginMethod: 'link' | 'google' | 'facebook'` | DEFAULT: 'link'. Método para inicio de sesión. Disponibles actualmente con **firebase authentication**. *Link* Ejecuta una redirección a la ruta de inicio de sesión. *google y facebook* activan el inicio de sesión con dicha red social.  |
| @Input() `loginButtonLink: string` | DEFAULT: '/'. Ruta de redirección en caso de que el método de loggeo sea *link* |
| @Input() `loginButtonLabel: string` | DEFAULT: 'Ingresar'. Leyenda en el botón de inicio de sessión. |
| @Input() `userMenú: MxNavbarMenuNode[]` | DEFAULT: []. Enlaces del menu del usuario. Contiene por default el método `signOut` |
| @Input() `unloggedPath: string` | DEFAULT: ''. Ruta a la que redigirá en el momento de desloggeo |
| @Output() `onSearch: EventEmitter<any>` | Trigger del buscador. |
| @Output() `onLogged: EventEmitter<any>` | Emite el usuario loggedado como `firebase.User`. |

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

