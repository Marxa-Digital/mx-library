# MxCrudPanel
Componente para crear paneles crud con componentes de **@angular/material**.

## Primerso pasos

| :exclamation:  IMPORTANTE :exclamation: |
|-----------------------------------------|
| Esta librería requiere **@angular/material** |

Instala corriendo el comando: 
```
npm i -s @marxa/crud-panel
```

Importa el módulo
```ts
import { MxCrudPanelModule } from "@marxa/devkit";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MxCrudPanelModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Modo de uso
El método para usar es anidar componentes en este componente. Pondremos el ejemplo con un componente para crear *post de blog*

En el comonente crea tu formulario y un `EventEmitter` que se encargará de cerrar el panel

```ts
interface Post {
  title: string,
  extract:string,
  releasedImage: string,
  content: string
}

@Component({
  selector: 'app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss']
})
export class AppPostComponent {

  @Input() post: Post
  @Output() onSaved: EventEmitter<any> = new EventEmitter()

  constructor(){}

  onSubmit(){
    // do the submit action
    this.onSaved.emit()
  }

}
```


Agrega el panel de la siguiente manera:
```html
<mx-crud-panel
listName="Entradas de blog"
[selectTemplate]="select"
[addTemplate]="add"
[list]="posts"
[height_vh]="90"
itemSelector="nombre"
#crudPanel
>
  <!-- Agrega un componente para agregar como #add o el nombre que tú quieras-->
  <ng-template #add>
    <app-post (onSave)="crudPanel.closePanel()"></app-post>
  </ng-template>

  <!-- Agrega otro componente para editar como #select o el nombre que quieras -->
  <!-- Designa una variable para el item seleccionado importarlo en tu formulario de edición -->
  <ng-template #select let-slide="item" >
    <app-post (onUpdate)="crudPanel.closePanel()" [post]="post"></app-post>
  </ng-template>
</mx-crud-panel>
```


## Parámentros
| Parámetro | Descripción |
|-----------|-------------|
| `@Input() listName: string` | El título encabezado del panel |
| `@Input() selectTemplate` | El template que será incrustado en el panel de selección |
| `@Input() addTemplate` | El template que será incrustado en el panel de adición |
| `@Input() list: any[]` | La lista de items |
| `@Input() height_vh: number` | Cantidad ViewHeigth del panel |
| `@Input() itemSelector: string` | El selector del item que aparecerá en el listado |


## Importando
Puedes acceder al componente con `@ViewChild`
```ts
@Component({
  selector: 'app-posts-list',
  templateUrl: './app-post-list.component.html',
  styleUrls: ['./app-post-list.component.scss']
})
export class AppPostListComponent {

  @ViewChild('crudPanel') private crudPanel!: MxCrudPanel

  constructor(){}

}
```



This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.
