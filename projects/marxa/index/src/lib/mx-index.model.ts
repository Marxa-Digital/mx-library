export interface mxIndexAnchor {
  page: number;
  firstQuery: any;
  lastQuery: any;
}

export interface mxIndexEvent {
  firstIndex: any,
  lastIndex: any,
  pageSize: number
}

export interface mxIndexCenterMessage {
  showing: string,
  from: string,
  to: string
}
