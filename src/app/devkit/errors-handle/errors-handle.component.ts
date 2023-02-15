import { Component } from '@angular/core';
import { MxErrors, MxErrorsHandle } from '@marxa/devkit';

@Component({
  selector: 'app-errors-handle',
  templateUrl: './errors-handle.component.html',
  styleUrls: ['./errors-handle.component.scss']
})
export class ErrorsHandleComponent {
  constructor(private _errors: MxErrorsHandle) {}

  runError() {
    try {
      throw new Error('Error');
    } catch (error: any) {
      this._errors.handleFn({
        severity: MxErrors.Severity.ALERT,
        token: 'not-found'
      });
    }
  }
}
