import { Provider } from '@angular/core';
import {
  ErrorsHandleDefaultConfigurations,
  ERRORS_CONFIG_TOKEN,
  MxErrorDefaultStatus,
  MxErrorDefaultTokens,
  MxErrors
} from '@marxa/devkit';

export const ERRORS_HANDLE_CONFIG: Provider = {
  provide: ERRORS_CONFIG_TOKEN,
  useValue: <MxErrors.config>{
    ...ErrorsHandleDefaultConfigurations,
    tokenMessagesMap: [...MxErrorDefaultTokens],
    statusMessagesMap: [...MxErrorDefaultStatus]
  }
};
