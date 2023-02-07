import { Component, Input } from "@angular/core";
import { MxAtLeastRoute } from "../pdp-checkbox.model";

@Component({
	selector: "app-pdp-route",
	template: `
		<a
			[routerLink]="[config.route | thisDomain : false : config.parentRoute]"
			[style.color]="config.linkColor"
			target="_blank "
			rel="noopener noreferrer "
		>
			{{ config.linkName }}
		</a>
	`,
})
export class PdpRouteComponent {
	@Input() config!: MxAtLeastRoute;
}
