# MxAuth
Una librería para hacer más fácil usar el oAuth2 de Firebase en proyectos de Angular

| :exclamation:  IMPORTANT :exclamation:  |
|------------------------------------------|
This documentation is writed in mexican spanish for latin developers for motivate to they always read software documentation. But you always can count on the cunning of google translate XD.

## Dependencias
Esta librería chambea con [Angular Material](https://material.angular.io/) y [Angular Fire](https://github.com/angular/angularfire) de Firebase.

### Primeros pasos antes de empezar
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
	 
 7. Ahora sí, ya puedes instalar esta librería `npm i -s @marxa/auth`

### Pasos adicionales
Para un mejor rendimiento, no olvides hacer los siguiente:

 1. Ve a tu proyecto de Firebase configurado y a la sección **Authentication**
 2. Presiona el  **Botón de empezar**
 3. Ve a la sección de **Sing-in method** y configura al menos las siguientes opciones
	 1. Email/Password
	 2. Google 
	 3. Facebook
4. También podrías en ese momento o más tarde, configurar los **Dominios autorizados** más abajo


## ¿Cómo se usa?
Puedes usar los componentes pre-construidos o usar el **servicio** de autenticación como  `MxAuth`

### Autenticación con Google
Como método rápido de autenticación, tus usuario pueden autenticarse con cuentas de Google o Gmail. Para esto, hemos construido un pop-up para usar este método de autenticación. Recuerda que antes necesitas activar esta opción en la consola de firebase.

#### Botón reactivo
Un simple botón de material para un sencillo inicio y cierre de sesión con cuenta de Google.
En cualquier parte de tu componente o de tu aplicación puedes agregar el snipet `mx-login-button`

Por defecto, este component displara un primer modal de advertencia de que se necesita una **cuenta de google**

#### Así se usa:
```html
<!-- your-components.component.html -->
<mx-login-button (isLogged)="onLogged($event)" ></mx-login-button>
```

```ts
import firebase from 'firebase/app'

export class LoginComponent implements OnInit {

	constructor()  {}
	
	onLogged(user: firebase.User) {
		console.log(user)
	}
}
```

Después de iniciar sesión, el botón cambia la leyenda de  **Iniciar sesión** por **Cerrar sessión**.
Puedes cambiar las leyendas. Aquí te ponemos  las propiedades:

**Escuchando eventos**
| Evento | Ejemplo |
|------------------|------------------|
| @Input() `method: 'google' | 'facebook' | Método de inicio de sesión preferido. |
|@Input() `accountAdvertice: boolean` | Por defecto es `true`. Controla el modal de advertencia de cuenta de google |
|@Output() `isLogged: EventEmitter<firebase.User>` | Emite un evento con lainformación del usuario autenticado |


**Propiedades**
| Nombre | Ejemplos por default |
|---------------------|--------------------------|
| `signInLabel: string` | [signInLabel]="Iniciar sesión"  |
| `signOutLabel: string` | [signOutLabel]="Cerrar sessión"  |
| `adverticeLabel: string` | [adverticeLabel]="IMPORTANTE"  |
| `googleAccountAdverticeLabel: HTML as string` | [googleAccountAdverticeLabel]="`<p>Debes tener una cuenta de Google <i>(tunombredeusuario@<b>gmail.com</b>)</i> para iniciar sesión.</p>`"  |
| `adverticeConfirmBtn: string` | [adverticeConfirmBtn]="Entiendo"  |


### Componentes preconstruidos
#### Componente Login Card
En cualquier componente ruteado puedes agregar `mx-login-card`
```html

<!-- your-component.html-->
<mx-login-card  (onSubmit)="onSubmit($event)"></mx-login-card>
```

El evento que se emite contiene `MxLoginFields` y lo puedes usar así:
```ts
// your-component.ts
import  {  Component,  OnInit  }  from  '@angular/core';
import  {  MxAuth,  MxLoginFields  }  from  '@marxa/auth';

@Component({
	templateUrl:  './login.component.html',
	styleUrls:  ['./login.component.scss']
})
export  class  LoginComponent  implements  OnInit  {

	constructor( private  _auth:  MxAuth )  {  }

	ngOnInit():  void  { }

	onSubmit(fields:  MxLoginFields)  {
		this._auth.emailSignIn(fields.email,  fields.password)
    // Esto emite una promesa con la interface firebase.User
    .then(user => console.log(user))
	}
}
```

##### PERSONAZIZACIONES
Puedes escuchar los eventos

| Evento | Ejemplo |
|------------------|------------------|
|@Output() `onSubmit: EventEmitter<MxLoginFields>` | Emite un objeto con la interface `MxLoginFields` |
|@Output() `restorePwd: EventEmitter<void>` | Emite un evento cuando el link "Olvidé mi contraseña" fue clickado |


También puedes cambiar lo siguiente en el template.

|Nombre|Ejemplo & Default |
|---------------------|--------------------------|
| @Input() `signInTitle: string` | signInTitle="Iniciar sesión"  |
| @Input() `emailLabel: string` | emailLabel="Email"  |
| @Input() `passwordLabel: string` | passwordLabel="Contraseña"  |
| @Input() `forgotPasswordLabel: string` | forgotPasswordLabel="Olvidé mi contraseña"  |
| @Input() `signInButton: string` | adverticeConfirmBtn="Entrar"  |



#### Componente Restore Password

En cualquier componente ruteado puedes agregar `mx-restore-password`


Por defecto, el compoente envía un evento a tu **proyecto de firebase** que enviará un email con las instrucciones para que se restablezca la contraseña. Puedes editar el template en **Firebase Console** => **Autenticación** => **Templates**.
```html
<!-- your-component.html-->
<mx-restore-password></mx-restore-password>
```

Si necesitas controlar el botón de envío, desactiva la propiedad `autoSend` y asigna una función que escucha el evento. Tal como el siguiente ejemplo. Este método enviará una promesa `void` para que puedas hacer lo que requieras.
```html
<!-- your-component.html-->
<mx-restore-password 
  [autoSend]="false"  
  (onSubmit)="onSubmit($event)"
></mx-restore-password>
```

también puedes combianr los componentes usando el cuadro de diálogo `RestorePasswordDialog` de la siguiente manera:

```html
<!-- your-component.html -->
<mx-login-card (restorePwd)="onRestorePwd()" ></mx-login-card>
```

```ts
// your-component.ts
import  {  Component,  OnInit  }  from  '@angular/core';
import  {  MxAuth,  MxLoginFields  }  from  'gdev-auth';
// No olivdes importar MatDialog
import { MatDialog } from '@angular/material/dialog';

@Component({
	templateUrl:  './login.component.html',
	styleUrls:  ['./login.component.scss']
})
export  class  LoginComponent  implements  OnInit  {

	constructor( private  _auth:  MxAuth )  {  }

	ngOnInit():  void  { }

	onRestorePwd(): void {
    this._dialog.open(RestorePasswordDialog, {
      width: '450px',
      data: {
        requiredLabel: 'Este dato es necesario',
        confirmationMessage: 'Un mensaje fue enviado a tu correo'
      }
    })
  }
}
```

##### PERSONALIZACIONES
| EventO | Ejemplo |
|------------------|------------------|
|@Input() `autoSend: boolean` | As default is `true`. Change the behaviour on Click button.|
|@Output() `onSubmit: EventEmitter<void>` | Emits a void event in the click event on send button|

Change labels:
|Name|Example & Default |
|---------------------|--------------------------|
| `emailLabel: string` | [emailLabel]="Email"  |
| `exampleLabel: string` | [exampleLabel]="example@gmail.com"  |
| `requiredLabel: string` | [requiredLabel]="Este campo es requerido"  |
| `cancelButtonLabel: string` | [cancelButtonLabel]="Cancelar"  |
| `sendButtonLabel: string` | [sendButtonLabel]="Enviar"  |
| `confirmationMessage: string` | [confirmationMessage]="`Enviando un correo a ${email} para cambiar la contraseña`"  |




### Inicio con redes
Para iniciar con redes sociales, puedes crear tus propios botones y usar los métodos de `MxAuth`

```ts
export class LoginComponent implements OnInit {

	constructor( private  _auth:  MxAuth )  {  }

	ngOnInit():  void  { }

	onFacebookSingIn(){
		this._auth.facebookSingIn()
			.then(user => console.log(user))
	}

	onGoogleSingIn(){
		this._auth.googleSingIn()
			.then(user => console.log(user))
	}
	
}
```

## Configuración
You can configure some propieties for Sing In methods

### Personaliza la colección de usuarios en FIRESTORE
Para guardar los usuario que se autentiquen en una colección en especial, puedes cambiar el nombre de la colección. Por defecto las colección donde **MxAuth** guarda es en la colección `users`.

```ts
export class LoginComponent implements OnInit {

	constructor( private  _auth:  MxAuth )  {
		this._auth.userCollection = 'administradores'
	}
}
```

### Ruta de desloggeo
Fácilmente puedes cerrar sesión de firebase con el método  `singOut()`. Pero esto va a activar la ruta por defecto `'/'` que envía al **root** de tus rutas.
También lo puedes cambiar con el servicio `MxAuth`.

```ts
export class LoginComponent implements OnInit {

	constructor( private  _auth:  MxAuth )  {
		this._auth.unloggedPath  = 'cualquier/ruta/que/quieras'
	}
}
```

### Escuchar los errores de inicio de sesión con email.
Para usos comunes, te puedes suscribir al **errors listener** y/o cambiar los **mensajes de error**:


```ts
export class LoginComponent implements OnInit {

	constructor( private  _auth:  MxAuth )  {
		// Actuales valores por defecto
		this._auth.notFoundMessage = 'Usuario no encontrado'
		this._auth.invalidMessage = 'Usa una dirección de correo válida'
		this._auth.wrongPasswordMessage = 'Contraseña incorrecta'
	}

	ngOnInit() {
		this._auth.listenForErros().subscribe(
			(message:string) => console.log(message)
		)
	}
}
```





This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.
