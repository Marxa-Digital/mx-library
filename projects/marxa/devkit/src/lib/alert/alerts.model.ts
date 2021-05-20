export class MxMessageAlertModel {
    constructor(
        public message: string,
        public type?: 'message' | 'request',
        public format?: 'text' | 'html',
        public trueMsg?: string,
        public falseMsg?: string,
        public confirmation?: boolean,
    ){}
}

export class MxPreguntaAlertaModel {
    constructor(
        public message: string,
        public respTrue?: string,
        public respFalse?: string
    ){}
}

export class MxErrorAlertModel {
    constructor (
        public message: string,
        public systemError: string
    ){}
}
