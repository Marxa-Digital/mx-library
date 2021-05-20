import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { MxErrorAlertModel, MxMessageAlertModel } from './alerts.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertPopupComponent as AlertPopupComponent } from './alert-popup/alert-popup.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class MxAlert {

    messageAlert$ = new Subject<MxMessageAlertModel>()
    requestAlert$ = new Subject<MxMessageAlertModel>()
    errorAlert$ = new Subject<MxErrorAlertModel>()
    responseAlert$ = new Subject<boolean>()
    storeError: boolean = false


    constructor (
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private _afs: AngularFirestore
    ) { }

    // Función que envía un mensaje de alerta
    // y espera la confirmación de la lectura del usuario
    message(message: MxMessageAlertModel | string, format?: 'text' | 'html'): Observable<any> {
        if (!format) format = 'text';
        var msgModel: MxMessageAlertModel =
            typeof message != 'string' ?  message :
                new MxMessageAlertModel( message, 'message', format )

        if (!msgModel.trueMsg) msgModel.trueMsg = 'Aceptar'

        const dialog = this.dialog.open( AlertPopupComponent, {
            minWidth: '450px',
            data: msgModel,
            role:'alertdialog'
        })

        return dialog.afterClosed()
    }


    // Función que envía una pregunta como alerta
    // y espera la respuesta true o false del usuario
    request({ message, trueMsg, falseMsg}: MxMessageAlertModel ): Observable<boolean> {

        if (!trueMsg) trueMsg = 'Aceptar'
        if ( !falseMsg ) falseMsg = 'Cancelar'

        let request: MxMessageAlertModel = {
            message, trueMsg, falseMsg, type: 'request'
        }

        var dialog = this.dialog.open( AlertPopupComponent, {
            minWidth: '450px',
            data: request,
            role: 'alertdialog',
            disableClose: true
        } )

        return dialog.afterClosed()
    }




    notify(
        notification: string,
        confirmText?: string,
        duration?: number,
        vPosition?: 'top' | 'bottom' ,
        hPosition?: 'start' | 'center' | 'end' | 'left' | 'right'
    ) {

        confirmText = confirmText ? confirmText : 'ok';
        let config: MatSnackBarConfig = {
            duration: duration ? duration : 30000,
            verticalPosition: vPosition ? vPosition : 'bottom',
            horizontalPosition: hPosition ? hPosition : 'right',
            panelClass:['snackBar']
        }

        this.snack.open( notification, confirmText, config)
    }


  sendError(message: string, error: any) {
      error = JSON.stringify(error)
      const alert = new MxErrorAlertModel(message, error)
      if (this.storeError) {
        this._afs.collection(`_admin/_main/errors`)
          .add({ error, mensaje: message })
      }
        this.dialog.open( ErrorPopupComponent, {
            width: '50%',
            data: alert
        } )
    }




}
