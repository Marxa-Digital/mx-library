export interface MxSidenavNode {
  name: string,
  routeId?: string | string[],
  route?: string,
  childs?: MxSidenavNode[],
  disable?: boolean
}
