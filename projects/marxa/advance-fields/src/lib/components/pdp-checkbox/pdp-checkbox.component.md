# Checkbox políticas de privacidad

## Modo de uso
1. En el componente de tu formulario, agrega el siguiente componente
```html
    <!-- PDP CHECKBOX  -->
  <mx-pdp-checkbox
  [config]="pdpConfig"
  [value]="contactForm.controls.aceptaPDP.value"
  (valueChanged)="onPDPChange($event)"
  ></mx-pdp-checkbox>
```

1. Crea una configuración con la interface `MxPDPConfig`
```ts
public pdpConfig: MxPDPConfig = {
		preLinkMsg: "I have been reading the ",
		postLinkMsg: " and I accept them",
		linkTextDisplay: "Privacy Policy",
		route: "privacy-policy",
	};
```

1. Crea un método que capture el resultado del checkbox
```ts
onPDPChange(value: any) {
  this.contactForm.controls.aceptaPDP.patchValue(value);
  this.contactForm.controls.aceptaPDP.updateValueAndValidity();
}
```

Puedes usar la configuración `route` para navegación dentro de la app. Pero si quieres usar un link externo, puedes usar `href`
