/**
 * Recibe la configuración para el componente de aceptar políticas de privacidad.
 * Es requerido al menos una opción de link, `router` y `href`
 *
 * @requires linkName `string`: Texto display del link
 * @requires route | href `string`: Routa de la aplicación o link externo
 * @default {
		preLinkMsg: "I have been reading the ",
		postLinkMsg: " and I accept them",
		linkTextDisplay: "Privacy Policy",
		route: "privacy-policy",
	};
 * @export
 * @interface MxPDPConfig
 */
export interface MxPDPConfig {
	/** REQUIRED Text to display link */
	linkTextDisplay: string;
	/** Text to display previous to linkTextDisplay  */
	preLinkMsg?: string;
	/** Text to display post to linkTextDisplay */
	postLinkMsg?: string;
	/** Hexagesimal coolor of the linkTextDisplay */
	linkColor?: string;
	/** Route inner app to go to Privacy Policy  */
	route?: string;
	/** Some parent to be consider to route. It doesn't works if route is not set */
	parentRoute?: string;
	/** External link to go to Privacy Policy. It doesn't works if route is set */
	href?: string;
}

export interface MxPDPRoute {
	route: string;
	parentRoute?: string;
}

export type MxAtLeastRoute = Omit<MxPDPConfig, "href"> & MxPDPRoute;

export interface MxPDPHref {
	href: string;
}

export type MxAtLeastHref = Omit<MxPDPConfig, "route" | "parentRoute"> & MxPDPHref;

export type MxPDPFlexConfig = MxAtLeastRoute | MxAtLeastHref;
