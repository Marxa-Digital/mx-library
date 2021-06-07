/** Modelo para las alertas
 * @class MxAlertModel
 */
export class MxAlertModel {
  constructor(
		public message: string,
		public type?: "message" | "request",
		public format?: "text" | "html",
		public trueMsg?: string,
		public falseMsg?: string,
		public confirmation?: boolean
	) {}
}


/** Modelos para los errores
 * @class MxErrorAlertModel
 */
export class MxErrorAlertModel {
  constructor(
    public message: string,
    public systemError: string
  ) { }
}
