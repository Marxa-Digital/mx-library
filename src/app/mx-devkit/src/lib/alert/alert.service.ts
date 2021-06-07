import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { MxErrorAlertModel, MxAlertModel } from "./alerts.model";
import { MatDialog } from "@angular/material/dialog";
import { AlertPopupComponent as AlertPopupComponent } from "./alert-popup/alert-popup.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ErrorPopupComponent } from "./error-popup/error-popup.component";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class MxAlert {
	messageAlert$ = new Subject<MxAlertModel>();
	requestAlert$ = new Subject<MxAlertModel>();
	errorAlert$ = new Subject<MxErrorAlertModel>();
	responseAlert$ = new Subject<boolean>();
	storeError: boolean = false;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private _afs: AngularFirestore
  ) { }

  /** Función que envía un mensaje de alerta y espera la confirmación de la lectura del usuario
   * @param {(MxAlertModel | string)} message Texto o MxAlertModel que aparecerá en el modal
   * @param {("text" | "html")} [format] OPCIONAL Formato del mensaje. Si es HTML puede ser enriquecido con css o los estilos de la librería. DEFAULT: 'text'
   * @returns {*}  {Observable<any>} Que escucha el momento del click de aceptación. Esto permite ejecutar funciones después de mostrar el mensaje.
   */
  message(
    message: MxAlertModel | string,
    format?: "text" | "html"
  ): Observable<any> {
		if (!format) format = "text";
		var msgModel: MxAlertModel =
			typeof message != "string" ? message : new MxAlertModel(message, "message", format);

		if (!msgModel.trueMsg) msgModel.trueMsg = "Aceptar";

		const dialog = this.dialog.open(AlertPopupComponent, {
			minWidth: "450px",
			data: msgModel,
			role: "alertdialog",
		});

		return dialog.afterClosed();
	}


	/** Función que envía una pregunta como alerta y espera la respuesta true o false del usuario
   * @param {MxAlertModel} { message, trueMsg, falseMsg } Objeto que permita la configutación de un mensaje de alerta con opciones.
   * @returns {*}  {Observable<boolean>} Escucha el momento del click del aceptar `trueMsg` o del rechazo `falseMsg` . Esto permite ejecutar funciones después de mostrar el mensaje.
   */
  request({ message, trueMsg, falseMsg }: MxAlertModel): Observable<boolean> {
		if (!trueMsg) trueMsg = "Aceptar";
		if (!falseMsg) falseMsg = "Cancelar";

		let request: MxAlertModel = {
			message,
			trueMsg,
			falseMsg,
			type: "request",
		};

		var dialog = this.dialog.open(AlertPopupComponent, {
			minWidth: "450px",
			data: request,
			role: "alertdialog",
			disableClose: true,
		});

		return dialog.afterClosed();
	}


  /** Material Snackbar preconfigurada para notificaciones simples
   * @param {string} notification Texto de notificación
   * @param {string} [confirmText] OPCIONAL Para cambiar el texto del botón. DEFAULT `'Ok'`
   * @param {number} [duration] OPCIONAL Duración automática en la que deseaparecerá la notificación. DEFAULT 10000ms
   * @param {("top" | "bottom")} [vPosition] OPCIONAL Posición donde apareceá verticalmente. DEFAULT `bottom`
   * @param {("start" | "center" | "end" | "left" | "right")} [hPosition] OPCIONAL Posición horizontal donde aprecerá. DEFAULT `right`.
   */
  notify(
		notification: string,
		confirmText?: string,
		duration?: number,
		vPosition?: "top" | "bottom",
		hPosition?: "start" | "center" | "end" | "left" | "right"
	) {
		confirmText = confirmText ? confirmText : "ok";
		let config: MatSnackBarConfig = {
			duration: duration ? duration : 10000,
			verticalPosition: vPosition ? vPosition : "bottom",
			horizontalPosition: hPosition ? hPosition : "right",
			panelClass: ["snackBar"],
		};

		this.snack.open(notification, confirmText, config);
	}




  /** Modal que muestra mensaje de error y el error explícito
   * @param {string} message Mensaje en string que mostrará el error personalizado
   * @param {*} error Error del sistema para mostrar explícitamente
   * @param {boolean} [storeError] OPCIONAL Si este error será guardado en firestore. Es posible configurarlo de manera gloabal llamando la propiedad `MxAlert.storeError`
   */
  error(message: string, error: any, storeError?: boolean) {
		error = JSON.stringify(error);
		const alert = new MxErrorAlertModel(message, error);
		if (this.storeError || storeError) {
			this._afs.collection(`_admin/_main/errors`).add({ error, mensaje: message });
		}
		this.dialog.open(ErrorPopupComponent, {
			minWidth: "50%",
			data: alert,
		});
	}
}
