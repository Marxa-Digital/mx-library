# INSTRUCCIONES PARA SCHEMATICS
Aquí las instrucciones para crear Schematics de Angular y hacer tus instalaciones de proyecto más sencilla

**PRO-TIP:** Si estás en Windows, se recomienda usar la consola PowerShell para casos más prácticos

## Crear schematics project
Para crear un proyecto de schematics, primero instala el Schematics CLI:
```
npm i -g @angular-devkit/schematics-cli
```
Entonces podrás crear un proyecto en blanco:
```
schematics blank --name=mi-libreria
```

## Create templates
Corre el siguiente comando para crear un árbol de directorio base de angular
```
mkdir -p src/my-component/files/src/app
```

Dentro de este árbol podrás crear todos los archivos que contendrá tu plantilla. 
Como archivos ts, html, hojas de estilo o módulos de configuración. 

Para ejemplos sencillos se recomienda revisar la siguiente librería
* [https://developer.okta.com/blog/2019/02/13/angular-schematics#copy-and-manipulate-templates]
* [https://indepth.dev/posts/1356/speed-up-your-angular-schematics-development-with-useful-helper-functions#add-content-on-a-specific-position]


Para ejemplos, usaremos el caso de la librería de Marxa Digital. 
